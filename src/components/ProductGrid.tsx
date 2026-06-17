import { useState } from 'react';
import ProductCard from './ProductCard';

interface Item {
  slug: string;
  name: string;
  sku: string;
  category: string;
  tagline: string;
  specs: { label: string; value: string }[];
  img?: string;
}

export default function ProductGrid({ products, cats }: { products: Item[]; cats: string[] }) {
  const [filter, setFilter] = useState('all');
  const shown = filter === 'all' ? products : products.filter((p) => p.category === filter);

  const chip = (active: boolean) =>
    `mono text-[0.66rem] rounded-full px-4 py-2 border transition-colors ${
      active ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]' : 'border-[var(--line-strong)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--ink)]'
    }`;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-10">
        <button className={chip(filter === 'all')} onClick={() => setFilter('all')}>ALL · {products.length}</button>
        {cats.map((c) => (
          <button key={c} className={chip(filter === c)} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shown.map((p) => (
          <ProductCard key={p.slug} slug={p.slug} name={p.name} sku={p.sku} category={p.category} tagline={p.tagline} specs={p.specs} img={p.img} />
        ))}
      </div>
    </>
  );
}
