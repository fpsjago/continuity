import { useState } from 'react';
import { addItem, whatsappSingle } from '../lib/cart';

function WA({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.29-.02-.45.13-.6.13-.13.3-.34.44-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.64.6.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 0 0-8.6 15.05L2 22l5.06-1.33A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export default function QuotePanel({ slug, name, sku }: { slug: string; name: string; sku: string }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const add = () => {
    addItem({ slug, name, sku }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4 mb-1">
        <span className="mono text-[0.62rem] text-[var(--muted)]">QTY</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="w-9 h-9 grid place-items-center border border-[var(--line-strong)] rounded-md hover:border-[var(--ink)]">−</button>
          <input
            value={qty}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
            inputMode="numeric"
            aria-label="Quantity"
            className="w-12 h-9 text-center font-[var(--font-mono)] text-[0.9rem] border border-[var(--line-strong)] rounded-md bg-[var(--bg)]"
          />
          <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="w-9 h-9 grid place-items-center border border-[var(--line-strong)] rounded-md hover:border-[var(--ink)]">+</button>
        </div>
      </div>

      <button
        onClick={add}
        className={`w-full inline-flex items-center justify-center gap-2 font-semibold px-6 py-3.5 rounded-[10px] transition-colors ${
          added ? 'bg-[#eafaf1] text-[#1d9a5a] border border-[#1d9a5a]' : 'bg-[var(--ink)] text-[var(--bg)] hover:brightness-110'
        }`}
      >
        {added ? (
          <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8l3 3 7-8" strokeLinecap="round" strokeLinejoin="round" /></svg> Added to quote</>
        ) : (
          'Add to quote'
        )}
      </button>

      <a
        href={whatsappSingle({ slug, name, sku }, qty)}
        target="_blank"
        rel="noopener"
        className="w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] text-[#062b16] font-bold px-6 py-3.5 rounded-[10px] hover:brightness-105 transition-[filter]"
      >
        <WA className="w-5 h-5" /> Quote on WhatsApp
      </a>
      <p className="text-[0.72rem] text-[var(--muted)] text-center">Add several products, then send one quote — or ask about this item now.</p>
    </div>
  );
}
