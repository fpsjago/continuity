import { useRef } from 'react';
import { useReveal } from '../lib/useReveal';
import ProductCard from './ProductCard';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

interface Item {
  slug: string;
  name: string;
  sku: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
  img?: string;
}

export default function ProductRail({ products }: { products: Item[] }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  return (
    <section ref={root} id="catalog" className="relative py-28 atmos-glow-top overflow-hidden">
      <div className="bgtype text-[clamp(5rem,15vw,13rem)] top-[3%] right-[-2%]" aria-hidden="true">INDEX</div>
      <div className="container relative z-10">
        <header className="flex items-end justify-between flex-wrap gap-5 mb-12">
          <div>
            <span className="kicker block mb-4" data-reveal>Plate 04b · Catalog</span>
            <h2 className="text-[clamp(2rem,4.2vw,3.4rem)]" data-reveal>Straight from the index.</h2>
            <p className="mt-4 max-w-[40rem] text-[var(--text)]/80" data-reveal>
              A slice of the catalog. Every line is specified to a standard and ships with a test report.
            </p>
          </div>
          <a href={`${base}products`} className="btn btn--ghost" data-reveal>
            View full catalog
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </header>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div data-reveal key={p.slug}>
              <ProductCard slug={p.slug} name={p.name} sku={p.sku} category={p.category} tagline={p.tagline} specs={p.specs} img={p.img} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
