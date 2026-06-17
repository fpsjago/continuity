import { WHATSAPP, BRAND } from '../config';

export interface CartItem {
  slug: string;
  name: string;
  sku: string;
  qty: number;
}

const KEY = 'continuity:quote';
const EVT = 'quote:change';
const has = () => typeof window !== 'undefined' && !!window.localStorage;

export function getCart(): CartItem[] {
  if (!has()) return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function addItem(item: Omit<CartItem, 'qty'>, qty = 1) {
  const items = getCart();
  const found = items.find((i) => i.slug === item.slug);
  if (found) found.qty += qty;
  else items.push({ ...item, qty });
  save(items);
}

export function setQty(slug: string, qty: number) {
  let items = getCart();
  if (qty <= 0) items = items.filter((i) => i.slug !== slug);
  else items = items.map((i) => (i.slug === slug ? { ...i, qty } : i));
  save(items);
}

export function removeItem(slug: string) {
  save(getCart().filter((i) => i.slug !== slug));
}

export function clearCart() {
  save([]);
}

export function count(): number {
  return getCart().reduce((n, i) => n + i.qty, 0);
}

export function subscribe(cb: () => void): () => void {
  if (!has()) return () => {};
  const handler = () => cb();
  window.addEventListener(EVT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener('storage', handler);
  };
}

/** Build a clean, WhatsApp-formatted quote message with a monospace table. */
export function buildMessage(items: CartItem[]): string {
  const NW = 24; // item name column width
  const trunc = (s: string) => (s.length > NW ? s.slice(0, NW - 1) + '…' : s);
  const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n);

  const header = `${pad('QTY', 4)}${pad('ITEM', NW + 1)}SKU`;
  const sep = '─'.repeat(4) + '─'.repeat(NW + 1) + '─'.repeat(14);
  const rows = items.map((i) => `${pad(i.qty + '×', 4)}${pad(trunc(i.name), NW + 1)}${i.sku}`);
  const units = items.reduce((n, i) => n + i.qty, 0);

  return [
    `*${BRAND} — Quote Request*`,
    '',
    "Hi, I'd like a quote for the following items:",
    '',
    '```',
    header,
    sep,
    ...rows,
    '```',
    '',
    `*Line items:* ${items.length}   *Total units:* ${units}`,
    '',
    'Please send pricing, lead time and a stamped spec sheet. Thank you.',
  ].join('\n');
}

export function whatsappUrl(items: CartItem[]): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(items))}`;
}

/** Single-item direct quote link (for a product page). */
export function whatsappSingle(item: Omit<CartItem, 'qty'>, qty = 1): string {
  return whatsappUrl([{ ...item, qty }]);
}
