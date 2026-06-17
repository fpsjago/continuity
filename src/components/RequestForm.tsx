import { useState } from 'react';

type Field = 'name' | 'company' | 'email' | 'detail';

export default function RequestForm() {
  const [v, setV] = useState<Record<Field, string>>({ name: '', company: '', email: '', detail: '' });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hp, setHp] = useState('');
  const [sent, setSent] = useState(false);

  const valid = (f: Field) => {
    if (f === 'email') return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email);
    if (f === 'detail') return v.detail.trim().length > 8;
    return v[f].trim().length > 1;
  };
  const allValid = (['name', 'email', 'detail'] as Field[]).every(valid);

  const set = (f: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((s) => ({ ...s, [f]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hp || !allValid) {
      setTouched({ name: true, email: true, detail: true });
      return;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="border border-[var(--primary)] rounded-[14px] p-10 bg-[var(--surface)] text-center">
        <svg width="48" height="48" viewBox="0 0 48 48" className="mx-auto mb-5" aria-hidden="true">
          <circle cx="24" cy="24" r="22" fill="none" stroke="var(--primary)" strokeWidth="2" />
          <path d="M15 24l6 6 12-13" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-[1.6rem]">Request logged.</h3>
        <p className="status-token justify-center mt-3" data-state="live"><span className="dot" /> LINK ESTABLISHED · WE REPLY WITHIN 1 BUSINESS DAY</p>
        <p className="text-[var(--muted)] text-[0.9rem] mt-4">This is a demo form — wire it to your endpoint of choice (Formspree, Resend, an Astro Action).</p>
      </div>
    );
  }

  const fieldCls = (f: Field) =>
    `w-full bg-[var(--bg)] border rounded-[10px] px-4 py-3 font-[var(--font-body)] text-[0.95rem] outline-none transition-colors ${
      touched[f] && !valid(f) ? 'border-[var(--primary)]' : 'border-[var(--line-strong)] focus:border-[var(--ink)]'
    }`;

  const Check = ({ f }: { f: Field }) =>
    valid(f) ? (
      <svg width="16" height="16" viewBox="0 0 16 16" className="absolute right-3 top-3.5" aria-hidden="true">
        <path d="M3 8l3 3 7-8" fill="none" stroke="#1d9a5a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : null;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" aria-hidden="true" />
      <div className="grid sm:grid-cols-2 gap-5">
        <label className="block relative">
          <span className="mono text-[0.62rem] text-[var(--muted)] block mb-2">NAME *</span>
          <input className={fieldCls('name')} value={v.name} onChange={set('name')} onBlur={() => setTouched((t) => ({ ...t, name: true }))} />
          <Check f="name" />
        </label>
        <label className="block relative">
          <span className="mono text-[0.62rem] text-[var(--muted)] block mb-2">COMPANY</span>
          <input className={fieldCls('company')} value={v.company} onChange={set('company')} />
          <Check f="company" />
        </label>
      </div>
      <label className="block relative">
        <span className="mono text-[0.62rem] text-[var(--muted)] block mb-2">EMAIL *</span>
        <input type="email" className={fieldCls('email')} value={v.email} onChange={set('email')} onBlur={() => setTouched((t) => ({ ...t, email: true }))} />
        <Check f="email" />
        {touched.email && !valid('email') && <span className="mono text-[0.6rem] text-[var(--primary)] mt-1.5 block">Enter a valid email.</span>}
      </label>
      <label className="block relative">
        <span className="mono text-[0.62rem] text-[var(--muted)] block mb-2">WHAT DOES THE LINK HAVE TO DO? *</span>
        <textarea rows={4} className={fieldCls('detail') + ' resize-none'} value={v.detail} onChange={set('detail')} onBlur={() => setTouched((t) => ({ ...t, detail: true }))} />
      </label>
      <button
        type="submit"
        disabled={!allValid}
        className="inline-flex items-center gap-2 bg-[var(--primary)] text-white font-semibold px-7 py-3.5 rounded-[10px] hover:-translate-y-0.5 transition-transform disabled:opacity-40 disabled:hover:translate-y-0"
      >
        Send request
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
    </form>
  );
}
