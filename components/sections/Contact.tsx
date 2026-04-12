'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { submitContactForm } from '@/lib/api';

type ToastProps = {
  type: 'success' | 'error';
  message: string;
  onClose: () => void;
};

function Toast({ type, message, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-start gap-3 max-w-sm w-full rounded-xl px-5 py-4 shadow-2xl transition-all duration-[400ms] ease-out"
      style={{
        background: isSuccess ? 'rgba(20, 30, 25, 0.95)' : 'rgba(30, 18, 18, 0.95)',
        border: `1px solid ${isSuccess ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
        backdropFilter: 'blur(12px)',
        transform: visible ? 'translateX(0)' : 'translateX(calc(100% + 1.5rem))',
        opacity: visible ? 1 : 0,
      }}
    >
      <span className="mt-0.5 shrink-0 text-lg leading-none">
        {isSuccess ? '✓' : '✕'}
      </span>
      <p className="text-sm leading-snug flex-1" style={{
        fontFamily: 'var(--font-body)',
        color: isSuccess ? '#86efac' : '#fca5a5',
      }}>
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity text-sm leading-none mt-0.5"
        style={{ color: isSuccess ? '#86efac' : '#fca5a5' }}
        aria-label="Sluiten"
      >
        ✕
      </button>
    </div>
  );
}

type RadioGroupProps = {
  name: string;
  options: { value: string; label: string; featured?: boolean; badge?: string }[];
  cols?: string;
  dotSm?: boolean;
};

function RadioGroup({ name, options, cols = 'grid-cols-1 sm:grid-cols-3', dotSm = false }: RadioGroupProps) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className={`grid ${cols} gap-3`}>
      {options.map(opt => (
        <label
          key={opt.value}
          className={`contact-option${dotSm ? ' contact-option-sm' : ''}${opt.featured ? ' contact-option-featured' : ''}${selected === opt.value ? ' is-selected' : ''}`}
          onClick={() => setSelected(opt.value)}
        >
          <input className="contact-radio" type="radio" name={name} value={opt.value} onChange={() => setSelected(opt.value)} />
          <span className={`co-dot${dotSm ? ' co-dot-sm' : ''}`} />
          <span className="font-[var(--font-label)] text-sm text-[#c6c6cb]">{opt.label}</span>
          {opt.badge && <span className="contact-badge">{opt.badge}</span>}
        </label>
      ))}
    </div>
  );
}

export default function Contact() {
  const t = useTranslations('contact');
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<'success' | 'error' | null>(null);
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus('loading');
    try {
      await submitContactForm(data);
      setStatus('idle');
      setToast('success');
      setFormKey(k => k + 1);
    } catch {
      setStatus('idle');
      setToast('error');
    }
  }

  return (
    <>
    <section id="contact" className="py-28 px-8 fade-up section-snap">
      <div className="absolute top-0 left-0 right-0 z-0 pointer-events-none" style={{ height: '220px', background: 'linear-gradient(to bottom, #0e1220, #0d1117)' }} />
      <div className="max-w-5xl mx-auto relative z-10">

        <div className="text-center mb-14">
          <span className="text-[#e0b6ff] tracking-[0.35em] uppercase text-xs mb-4 block font-semibold" style={{ fontFamily: 'var(--font-label)' }}>
            {t('label')}
          </span>
          <h2 className="font-bold text-[#e1e2e7] mb-4" style={{ fontFamily: 'var(--font-headline)', fontSize: 'clamp(2.2rem,4vw,3.6rem)', lineHeight: 1.05 }}>
            {t('title')}
          </h2>
          <p className="text-[#c6c6cb] text-lg max-w-xl mx-auto">{t('sub')}</p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-2xl" style={{ background: 'rgba(25,28,31,0.65)', borderColor: 'rgba(93,109,255,0.1)' }}>
          <form key={formKey} ref={formRef} className="space-y-8" onSubmit={handleSubmit}>

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                  {t('formName')} <span className="text-[#e0b6ff]">*</span>
                </label>
                <input className="form-input w-full rounded-xl px-5 py-4" placeholder={t('formNamePh')} type="text" name="name" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                  {t('formEmail')} <span className="text-[#e0b6ff]">*</span>
                </label>
                <input className="form-input w-full rounded-xl px-5 py-4" placeholder={t('formEmailPh')} type="email" name="email" required />
              </div>
            </div>

            {/* Social */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                {t('formSocial')} <span className="form-optional">{t('formSocialOptional')}</span>
              </label>
              <input className="form-input w-full rounded-xl px-5 py-4" placeholder={t('formSocialPh')} type="text" name="social" />
            </div>

            {/* Content Needs */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                {t('formNeedLabel')} <span className="text-[#e0b6ff]">*</span>
              </label>
              <RadioGroup
                name="content_need"
                options={[
                  { value: 'longform',  label: t('formNeed1') },
                  { value: 'shortform', label: t('formNeed2') },
                  { value: 'both',      label: t('formNeed3'), featured: true, badge: t('formPopular') },
                ]}
              />
            </div>

            {/* Volume */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                {t('formVolumeLabel')}
              </label>
              <RadioGroup
                name="volume"
                cols="grid-cols-2 sm:grid-cols-4"
                dotSm
                options={[
                  { value: '1-2',    label: t('formVol1') },
                  { value: '3-5',    label: t('formVol2') },
                  { value: 'weekly', label: t('formVol3') },
                  { value: 'daily',  label: t('formVol4') },
                ]}
              />
            </div>

            {/* Budget */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                {t('formBudgetLabel')} <span className="text-[#e0b6ff]">*</span>
              </label>
              <RadioGroup
                name="budget"
                cols="grid-cols-2 sm:grid-cols-4"
                dotSm
                options={[
                  { value: 'under500',  label: t('formBudget1') },
                  { value: '500-1000',  label: t('formBudget2') },
                  { value: '1000-2500', label: t('formBudget3') },
                  { value: '2500+',     label: t('formBudget4') },
                ]}
              />
            </div>

            {/* Goals */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[#c6c6cb] ml-1 block" style={{ fontFamily: 'var(--font-label)' }}>
                {t('formGoalsLabel')}
              </label>
              <textarea
                className="form-textarea w-full rounded-xl px-5 py-4 resize-none"
                rows={4}
                name="goals"
                placeholder={t('formGoalsPh')}
              />
            </div>

            <button type="submit" disabled={status === 'loading'} className="btn-primary w-full py-5 rounded-xl font-bold text-base glow-purple disabled:opacity-60">
              {status === 'loading' ? '...' : t('formSubmit')}
            </button>

          </form>
        </div>
      </div>
    </section>

    {toast && (
      <Toast
        type={toast}
        message={toast === 'success' ? t('formSuccess') : t('formError')}
        onClose={() => setToast(null)}
      />
    )}
    </>
  );
}
