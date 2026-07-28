'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Point = { x: number; y: number };
type SeriesId = 'image' | 'text';

const DEFAULT_IMAGE: Point[] = [
  { x: -4.9, y: 87.5 },
  { x: 2.6, y: 91.1 },
  { x: 6.9, y: 92.3 },
  { x: 12.2, y: 92.8 },
  { x: 16.8, y: 92.5 },
  { x: 23.7, y: 89.9 },
  { x: 29.1, y: 82.4 },
  { x: 32.9, y: 73.7 },
  { x: 35.2, y: 61.6 },
  { x: 36.1, y: 48.7 },
  { x: 36.6, y: 37.2 },
  { x: 36.9, y: 8.3 },
  { x: 37.1, y: -6.0 },
  { x: 37.1, y: -20.1 },
];

const DEFAULT_TEXT: Point[] = [
  { x: 83.4, y: 83.1 },
  { x: 78.6, y: 82.4 },
  { x: 74.4, y: 80.7 },
  { x: 71.1, y: 76.6 },
  { x: 68.2, y: 71.3 },
  { x: 66.0, y: 65.7 },
  { x: 65.1, y: 58.0 },
  { x: 65.3, y: -3.4 },
];

const PAD = 48;
const HIT_RADIUS = 10;

function formatExport(points: Point[]) {
  return `[\n${points
    .map((p) => `  { x: "${p.x.toFixed(1)}vw", y: "${p.y.toFixed(1)}vh" },`)
    .join('\n')}\n]`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ChartPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagePoints, setImagePoints] = useState<Point[]>(DEFAULT_IMAGE);
  const [textPoints, setTextPoints] = useState<Point[]>(DEFAULT_TEXT);
  const [activeSeries, setActiveSeries] = useState<SeriesId>('image');
  const [selected, setSelected] = useState<{ series: SeriesId; index: number } | null>(
    null
  );
  const [drag, setDrag] = useState<{ series: SeriesId; index: number } | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [bounds, setBounds] = useState({
    minX: -20,
    maxX: 120,
    minY: -30,
    maxY: 130,
  });

  const activePoints = activeSeries === 'image' ? imagePoints : textPoints;
  const setActivePoints = activeSeries === 'image' ? setImagePoints : setTextPoints;

  const project = useCallback(
    (point: Point, width: number, height: number) => {
      const plotW = width - PAD * 2;
      const plotH = height - PAD * 2;
      // Match CSS viewport: x left→right, y top→bottom (0vh at top).
      const x =
        PAD +
        ((point.x - bounds.minX) / Math.max(bounds.maxX - bounds.minX, 1)) * plotW;
      const y =
        PAD +
        ((point.y - bounds.minY) / Math.max(bounds.maxY - bounds.minY, 1)) * plotH;
      return { x, y };
    },
    [bounds]
  );

  const unproject = useCallback(
    (canvasX: number, canvasY: number, width: number, height: number): Point => {
      const plotW = width - PAD * 2;
      const plotH = height - PAD * 2;
      const x =
        bounds.minX +
        ((canvasX - PAD) / Math.max(plotW, 1)) * (bounds.maxX - bounds.minX);
      const y =
        bounds.minY +
        ((canvasY - PAD) / Math.max(plotH, 1)) * (bounds.maxY - bounds.minY);
      return {
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
      };
    },
    [bounds]
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.fillStyle = '#070707';
    ctx.fillRect(0, 0, width, height);

    // Outer container: full editable stage (beyond viewport)
    const outerTL = project({ x: bounds.minX, y: bounds.minY }, width, height);
    const outerBR = project({ x: bounds.maxX, y: bounds.maxY }, width, height);
    const outerW = outerBR.x - outerTL.x;
    const outerH = outerBR.y - outerTL.y;

    ctx.fillStyle = '#121212';
    ctx.fillRect(outerTL.x, outerTL.y, outerW, outerH);
    ctx.strokeStyle = 'rgba(255,255,255,0.22)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(outerTL.x, outerTL.y, outerW, outerH);

    // Grid across outer stage
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let v = Math.ceil(bounds.minX / 10) * 10; v <= bounds.maxX; v += 10) {
      const a = project({ x: v, y: bounds.minY }, width, height);
      const b = project({ x: v, y: bounds.maxY }, width, height);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    for (let v = Math.ceil(bounds.minY / 10) * 10; v <= bounds.maxY; v += 10) {
      const a = project({ x: bounds.minX, y: v }, width, height);
      const b = project({ x: bounds.maxX, y: v }, width, height);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }

    // Inner container: simulated viewport (0-100 vw/vh)
    const viewTL = project({ x: 0, y: 0 }, width, height);
    const viewBR = project({ x: 100, y: 100 }, width, height);
    const viewW = viewBR.x - viewTL.x;
    const viewH = viewBR.y - viewTL.y;

    ctx.fillStyle = 'rgba(255,255,255,0.035)';
    ctx.fillRect(viewTL.x, viewTL.y, viewW, viewH);
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 2;
    ctx.strokeRect(viewTL.x, viewTL.y, viewW, viewH);

    // Viewport crosshair midlines
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    const mid = project({ x: 50, y: 50 }, width, height);
    ctx.beginPath();
    ctx.moveTo(mid.x, viewTL.y);
    ctx.lineTo(mid.x, viewBR.y);
    ctx.moveTo(viewTL.x, mid.y);
    ctx.lineTo(viewBR.x, mid.y);
    ctx.stroke();

    // Labels
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText('Outer stage (off-screen capture)', outerTL.x + 8, outerTL.y + 16);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fillText('Viewport 0-100', viewTL.x + 8, viewTL.y + 16);
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.fillText('0,0', viewTL.x + 6, viewTL.y + 28);
    ctx.fillText('100vw', viewBR.x - 42, viewTL.y + 28);
    ctx.fillText('100vh', viewTL.x + 6, viewBR.y - 8);

    const drawSeries = (
      points: Point[],
      color: string,
      series: SeriesId
    ) => {
      if (!points.length) return;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      points.forEach((point, index) => {
        const p = project(point, width, height);
        if (index === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      points.forEach((point, index) => {
        const p = project(point, width, height);
        const isSelected =
          selected?.series === series && selected.index === index;
        ctx.beginPath();
        ctx.arc(p.x, p.y, isSelected ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#fff' : color;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
        ctx.fillText(String(index), p.x + 8, p.y - 8);
      });
    };

    drawSeries(imagePoints, '#ffd300', 'image');
    drawSeries(textPoints, '#8a7394', 'text');
  }, [bounds, imagePoints, project, selected, textPoints]);

  useEffect(() => {
    draw();
    const onResize = () => draw();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [draw]);

  const hitTest = (canvasX: number, canvasY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const candidates: { series: SeriesId; index: number; dist: number }[] = [];
    const check = (points: Point[], series: SeriesId) => {
      points.forEach((point, index) => {
        const p = project(point, width, height);
        const d = Math.hypot(p.x - canvasX, p.y - canvasY);
        if (d <= HIT_RADIUS) candidates.push({ series, index, dist: d });
      });
    };
    check(imagePoints, 'image');
    check(textPoints, 'text');
    candidates.sort((a, b) => a.dist - b.dist);
    return candidates[0] ?? null;
  };

  const eventPos = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = eventPos(event);
    const hit = hitTest(x, y);
    if (!hit) {
      setSelected(null);
      return;
    }
    setActiveSeries(hit.series);
    setSelected({ series: hit.series, index: hit.index });
    setDrag({ series: hit.series, index: hit.index });
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drag) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { x, y } = eventPos(event);
    const next = unproject(x, y, canvas.clientWidth, canvas.clientHeight);
    const updater = drag.series === 'image' ? setImagePoints : setTextPoints;
    updater((prev) =>
      prev.map((point, index) => (index === drag.index ? next : point))
    );
  };

  const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (drag) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* ignore */
      }
    }
    setDrag(null);
  };

  const addPoint = () => {
    setActivePoints((prev) => {
      if (!prev.length) return [{ x: 50, y: 50 }];
      if (selected?.series === activeSeries) {
        const base = prev[selected.index];
        const insertAt = selected.index + 1;
        const nextPoint = {
          x: Math.round((base.x + 4) * 10) / 10,
          y: Math.round((base.y - 4) * 10) / 10,
        };
        const copy = [...prev];
        copy.splice(insertAt, 0, nextPoint);
        setSelected({ series: activeSeries, index: insertAt });
        return copy;
      }
      const last = prev[prev.length - 1];
      return [
        ...prev,
        {
          x: Math.round((last.x + 3) * 10) / 10,
          y: Math.round((last.y - 6) * 10) / 10,
        },
      ];
    });
  };

  const removePoint = () => {
    if (!selected || selected.series !== activeSeries) return;
    setActivePoints((prev) => {
      if (prev.length <= 2) return prev;
      const next = prev.filter((_, index) => index !== selected.index);
      const nextIndex = clamp(selected.index, 0, next.length - 1);
      setSelected({ series: activeSeries, index: nextIndex });
      return next;
    });
  };

  const copySeries = async (series: SeriesId) => {
    const points = series === 'image' ? imagePoints : textPoints;
    try {
      await navigator.clipboard.writeText(formatExport(points));
      setCopied(series);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      /* ignore */
    }
  };

  const selectedPoint = useMemo(() => {
    if (!selected) return null;
    const points = selected.series === 'image' ? imagePoints : textPoints;
    return points[selected.index] ?? null;
  }, [imagePoints, selected, textPoints]);

  const updateSelectedCoord = (axis: 'x' | 'y', value: string) => {
    if (!selected) return;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return;
    const updater = selected.series === 'image' ? setImagePoints : setTextPoints;
    updater((prev) =>
      prev.map((point, index) =>
        index === selected.index ? { ...point, [axis]: numeric } : point
      )
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">Path chart</p>
            <h1 className="mt-2 text-2xl font-light tracking-[-0.03em]">
              Drag points to reshape image and text curves
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveSeries('image')}
              className={`rounded border px-3 py-1.5 text-xs uppercase tracking-wide ${
                activeSeries === 'image'
                  ? 'border-[#ffd300] bg-[#ffd300]/15 text-[#ffd300]'
                  : 'border-white/20 text-white/70'
              }`}
            >
              Image path
            </button>
            <button
              type="button"
              onClick={() => setActiveSeries('text')}
              className={`rounded border px-3 py-1.5 text-xs uppercase tracking-wide ${
                activeSeries === 'text'
                  ? 'border-[#8a7394] bg-[#8a7394]/20 text-[#cbb7d8]'
                  : 'border-white/20 text-white/70'
              }`}
            >
              Text path
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0a] p-3">
            <div className="mb-2 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.16em] text-white/45">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm border border-white/50 bg-white/10" />
                Inner viewport (0-100)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm border border-white/25 bg-[#121212]" />
                Outer stage (off-screen)
              </span>
            </div>
            <canvas
              ref={canvasRef}
              className="h-[min(72vh,760px)] w-full cursor-crosshair touch-none rounded-lg border border-white/10"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            />
          </div>

          <aside className="space-y-4 rounded-xl border border-white/10 bg-[#111] p-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                Active series
              </p>
              <p className="mt-1 text-sm text-white/80">
                {activeSeries === 'image' ? 'Image' : 'Text'} · {activePoints.length} points
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={addPoint}
                className="rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide text-white/80 hover:border-white/50"
              >
                Add point
              </button>
              <button
                type="button"
                onClick={removePoint}
                disabled={!selected || selected.series !== activeSeries || activePoints.length <= 2}
                className="rounded border border-white/20 px-3 py-1.5 text-xs uppercase tracking-wide text-white/80 hover:border-white/50 disabled:opacity-30"
              >
                Remove point
              </button>
            </div>

            {selectedPoint && selected ? (
              <div className="space-y-2 rounded-lg border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                  Point {selected.index} ({selected.series})
                </p>
                <label className="flex items-center justify-between gap-3 text-xs text-white/70">
                  X (vw)
                  <input
                    type="number"
                    step="0.1"
                    value={selectedPoint.x}
                    onChange={(event) => updateSelectedCoord('x', event.target.value)}
                    className="w-24 rounded border border-white/15 bg-black px-2 py-1 text-right text-white"
                  />
                </label>
                <label className="flex items-center justify-between gap-3 text-xs text-white/70">
                  Y (vh)
                  <input
                    type="number"
                    step="0.1"
                    value={selectedPoint.y}
                    onChange={(event) => updateSelectedCoord('y', event.target.value)}
                    className="w-24 rounded border border-white/15 bg-black px-2 py-1 text-right text-white"
                  />
                </label>
              </div>
            ) : (
              <p className="text-xs text-white/40">Click a point to select and edit it.</p>
            )}

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => copySeries('image')}
                className="w-full rounded border border-[#ffd300]/40 px-3 py-2 text-xs uppercase tracking-wide text-[#ffd300] hover:bg-[#ffd300]/10"
              >
                {copied === 'image' ? 'Copied image path' : 'Copy image path'}
              </button>
              <button
                type="button"
                onClick={() => copySeries('text')}
                className="w-full rounded border border-[#8a7394]/50 px-3 py-2 text-xs uppercase tracking-wide text-[#cbb7d8] hover:bg-[#8a7394]/15"
              >
                {copied === 'text' ? 'Copied text path' : 'Copy text path'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setImagePoints(DEFAULT_IMAGE);
                  setTextPoints(DEFAULT_TEXT);
                  setSelected(null);
                }}
                className="w-full rounded border border-white/15 px-3 py-2 text-xs uppercase tracking-wide text-white/60 hover:border-white/35"
              >
                Reset defaults
              </button>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                Outer stage bounds
              </p>
              <p className="text-[11px] leading-relaxed text-white/40">
                Inner box is the viewport. Outer bounds catch points that start or finish
                off-screen.
              </p>
              {(
                [
                  ['minX', 'Min X'],
                  ['maxX', 'Max X'],
                  ['minY', 'Min Y'],
                  ['maxY', 'Max Y'],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 text-xs text-white/70"
                >
                  {label}
                  <input
                    type="number"
                    value={bounds[key]}
                    onChange={(event) =>
                      setBounds((prev) => ({
                        ...prev,
                        [key]: Number(event.target.value),
                      }))
                    }
                    className="w-20 rounded border border-white/15 bg-black px-2 py-1 text-right text-white"
                  />
                </label>
              ))}
            </div>
          </aside>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <pre className="overflow-x-auto rounded-xl border border-[#ffd300]/25 bg-[#111] p-4 text-[11px] text-[#ffd300]/90">
            {formatExport(imagePoints)}
          </pre>
          <pre className="overflow-x-auto rounded-xl border border-[#8a7394]/35 bg-[#111] p-4 text-[11px] text-[#cbb7d8]">
            {formatExport(textPoints)}
          </pre>
        </div>
      </div>
    </div>
  );
}
