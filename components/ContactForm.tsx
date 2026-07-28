'use client';

import React, { FormEvent, useState } from 'react';
import clsx from 'clsx';
import { CircleNotch } from '@phosphor-icons/react';
import Button from './Button';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
};

const INITIAL: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  interest: '',
  message: '',
};

const INTERESTS = [
  'Formwork',
  'Concrete',
  'Scaffold',
  'Sales & Hire',
  'Structural package',
  'Other',
];

const fieldBase =
  'box-border w-full min-w-0 max-w-full border-0 border-b border-[var(--bkh-border)] bg-transparent px-0 py-3 font-light text-[var(--bkh-text-strong)] outline-none transition placeholder:text-[var(--bkh-text-muted)] focus:border-[var(--bkh-accent)]';

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-[var(--bkh-text-muted)]">
      {children}
    </span>
  );
}

export default function ContactForm() {
  const [data, setData] = useState<ContactFormData>(INITIAL);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  function update<K extends keyof ContactFormData>(key: K, value: ContactFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (!data.name.trim() || !data.email.trim() || !data.phone.trim() || !data.message.trim()) {
      setError('Please complete the required fields.');
      return;
    }

    setStatus('loading');
    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus('success');
      setData(INITIAL);
    } catch {
      setStatus('error');
      setError('Something went wrong. Please call us or try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-b border-[var(--bkh-border)] py-14 text-center">
        <h3 className="font-light text-[var(--bkh-text-strong)]">Thanks for getting in touch.</h3>
        <p className="mx-auto mt-4 max-w-md font-light text-[var(--bkh-text-body)]">
          Our team will review your enquiry and respond shortly.
        </p>
        <button
          type="button"
          className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-[var(--bkh-text-strong)] underline underline-offset-4"
          onClick={() => setStatus('idle')}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form className="@container w-full min-w-0 space-y-8" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-8 @[36rem]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <label className="block min-w-0">
          <FieldLabel>Name *</FieldLabel>
          <input
            className={fieldBase}
            value={data.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
            required
          />
        </label>
        <label className="block min-w-0">
          <FieldLabel>Company</FieldLabel>
          <input
            className={fieldBase}
            value={data.company}
            onChange={(e) => update('company', e.target.value)}
            autoComplete="organization"
          />
        </label>
        <label className="block min-w-0">
          <FieldLabel>Email *</FieldLabel>
          <input
            type="email"
            className={fieldBase}
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="block min-w-0">
          <FieldLabel>Phone *</FieldLabel>
          <input
            type="tel"
            className={fieldBase}
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
            required
          />
        </label>
      </div>

      <label className="block min-w-0">
        <FieldLabel>Interest</FieldLabel>
        <select
          className={clsx(fieldBase, 'appearance-none')}
          value={data.interest}
          onChange={(e) => update('interest', e.target.value)}
        >
          <option value="">Select a service</option>
          {INTERESTS.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block min-w-0">
        <FieldLabel>Message *</FieldLabel>
        <textarea
          className={clsx(fieldBase, 'min-h-[120px] resize-y')}
          value={data.message}
          onChange={(e) => update('message', e.target.value)}
          required
        />
      </label>

      {error ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <Button type="submit" variant="primary" className="!px-8 !py-3.5" disabled={status === 'loading'}>
        {status === 'loading' ? (
          <span className="inline-flex items-center gap-2">
            <CircleNotch size={18} className="animate-spin" />
            Sending
          </span>
        ) : (
          'Send enquiry'
        )}
      </Button>
    </form>
  );
}
