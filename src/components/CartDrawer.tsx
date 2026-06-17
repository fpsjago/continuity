import { useEffect, useState } from 'react';
import { getCart, setQty, removeItem, clearCart, count, subscribe, whatsappUrl, type CartItem } from '../lib/cart';

function WA({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.21-.62.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.04-.17-.29-.02-.45.13-.6.13-.13.3-.34.44-.51.15-.17.2-.29.3-.48.1-.19.05-.36-.02-.51-.08-.15-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.64.6.69.22 1.31.19 1.8.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 0 0-8.6 15.05L2 22l5.06-1.33A10 10 0 1 0 12 2z" />
    </svg>
  );
}

export default function CartDrawer() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const sync = () => { setItems(getCart()); setN(count()); };
    sync();
    return subscribe(sync);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={`Open quote (${n} items)`}
        className="fixed bottom-6 right-6 z-[150] inline-flex items-center gap-2.5 bg-[var(--primary)] text-white font-semibold text-[0.9rem] pl-4 pr-5 py-3.5 rounded-full shadow-[0_14px_36px_-8px_rgba(204,0,0,0.6)] hover:-translate-y-0.5 transition-transform"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M3 4h2l2.4 12.4a1 1 0 0 0 1 .8h8.7a1 1 0 0 0 1-.8L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" /><circle cx="18" cy="20" r="1.4" fill="currentColor" stroke="none" />
        </svg>
        Quote
        {n > 0 && (
          <span className="ml-0.5 min-w-[22px] h-[22px] grid place-items-center rounded-full bg-white text-[var(--primary)] text-[0.72rem] font-bold px-1.5">{n}</span>
        )}
      </button>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[160] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* panel */}
      <aside
        role="dialog"
        aria-label="Quote request"
        aria-modal="true"
        className={`fixed top-0 right-0 z-[170] h-full w-[min(420px,92vw)] bg-[var(--surface)] border-l border-[var(--line-strong)] shadow-2xl flex flex-col transition-transform duration-[350ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between px-6 py-5 border-b border-[var(--line)]">
          <div>
            <h2 className="font-[var(--font-heading)] text-[1.3rem]">Your quote</h2>
            <p className="mono text-[0.6rem] text-[var(--muted)]">{n} item{n === 1 ? '' : 's'} · no checkout, no payment</p>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close" className="w-9 h-9 grid place-items-center border border-[var(--line-strong)] rounded-lg hover:border-[var(--ink)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" /></svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full grid place-items-center text-center text-[var(--muted)] py-16">
              <div>
                <p className="font-[var(--font-heading)] text-[1.1rem] text-[var(--ink)] mb-2">No items yet</p>
                <p className="text-[0.88rem] max-w-[24ch] mx-auto">Add products from the catalog, then request a quote on WhatsApp.</p>
              </div>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {items.map((i) => (
                <li key={i.slug} className="py-4 flex items-start gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-[0.92rem] leading-tight">{i.name}</p>
                    <p className="mono text-[0.6rem] text-[var(--muted)] mt-0.5">{i.sku}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Decrease" className="w-7 h-7 grid place-items-center border border-[var(--line-strong)] rounded-md hover:border-[var(--ink)]">−</button>
                      <span className="mono text-[0.8rem] w-7 text-center">{i.qty}</span>
                      <button onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Increase" className="w-7 h-7 grid place-items-center border border-[var(--line-strong)] rounded-md hover:border-[var(--ink)]">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(i.slug)} aria-label="Remove" className="mono text-[0.6rem] text-[var(--muted)] hover:text-[var(--primary)] mt-1">REMOVE</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-[var(--line)] px-6 py-5 space-y-3">
            <a
              href={whatsappUrl(items)}
              target="_blank"
              rel="noopener"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] text-[#062b16] font-bold py-3.5 rounded-[11px] hover:brightness-105 transition-[filter]"
            >
              <WA className="w-5 h-5" /> Request quote via WhatsApp
            </a>
            <button onClick={clearCart} className="w-full text-center mono text-[0.62rem] text-[var(--muted)] hover:text-[var(--ink)]">CLEAR QUOTE</button>
            <p className="text-center text-[0.7rem] text-[var(--muted)]">Opens WhatsApp with all items pre-filled. We reply with pricing & lead time.</p>
          </footer>
        )}
      </aside>
    </>
  );
}
