'use client';

import React from 'react';
import clsx from 'clsx';
import { ArrowRight } from '@phosphor-icons/react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'arrow';

type ButtonBaseProps = {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  type?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'rounded-md bg-[var(--bkh-cta)] px-6 py-2.5 text-[15px] font-medium tracking-wide text-[var(--bkh-cta-ink)] transition-colors hover:bg-[var(--bkh-cta-strong)]',
  secondary:
    'rounded-md bg-[var(--bkh-surface-subtle)] px-6 py-2.5 text-[15px] font-medium tracking-wide text-[var(--bkh-text-strong)] transition-colors hover:bg-[var(--bkh-border)]',
  outline:
    'rounded-md border border-[var(--bkh-accent)] bg-transparent px-6 py-2.5 text-[15px] font-medium tracking-wide text-[var(--bkh-accent)] transition-colors hover:bg-[var(--bkh-accent-tint)]',
  arrow: 'text-[var(--bkh-text-strong)]',
};

export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className, disabled, ariaLabel } = props;
  const shouldRenderDefaultArrow =
    variant === 'arrow' &&
    (children === undefined ||
      children === null ||
      typeof children === 'string' ||
      typeof children === 'number');
  const content = variant === 'arrow'
    ? (
      <>
        {children}
        {shouldRenderDefaultArrow && (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bkh-brand-tint)] transition-colors group-hover:bg-[var(--bkh-border)] text-[var(--bkh-text-strong)]">
            <ArrowRight size={16} aria-hidden />
          </span>
        )}
      </>
    )
    : children;
  const classes = clsx(
    'inline-flex items-center justify-center',
    variant === 'arrow' && 'group gap-2 bg-transparent p-0 shadow-none',
    VARIANT_CLASSES[variant],
    disabled && 'pointer-events-none opacity-50',
    className
  );

  if ('href' in props && props.href !== undefined) {
    return (
      <a href={props.href} className={classes} aria-label={ariaLabel ?? (variant === 'arrow' ? 'Open link' : undefined)}>
        {content}
      </a>
    );
  }

  const { type = 'button', onClick } = props as ButtonAsButton;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel ?? (variant === 'arrow' ? 'Open' : undefined)}
    >
      {content}
    </button>
  );
}
