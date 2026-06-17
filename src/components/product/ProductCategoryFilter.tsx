import { useState } from 'react';

export interface Product {
  href: string;
  title: string;
  brand: string;
  category: string;
  image: string;
  imageAlt: string;
  shortDescription: string;
  available?: boolean;
}

interface Props {
  products: Product[];
  categories: string[];
}

export default function ProductCategoryFilter({ products, categories }: Props) {
  const [active, setActive] = useState<string>('Tutti');

  const filtered =
    active === 'Tutti'
      ? products
      : products.filter((p) => p.category === active);

  const tabs = ['Tutti', ...categories];

  return (
    <div>
      <div
        className="flex flex-wrap gap-3 mb-10"
        role="tablist"
        aria-label="Filtra prodotti per categoria"
      >
        {tabs.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActive(cat)}
              className={`px-5 h-12 rounded-2xl font-bold text-sm transition-all duration-200 ${
                isActive
                  ? 'clay-button-primary text-white'
                  : 'glass-clay text-clay-foreground hover:-translate-y-0.5'
              }`}
              style={{
                fontFamily: 'Nunito, sans-serif',
                boxShadow: isActive
                  ? 'var(--shadow-clay-button)'
                  : 'var(--shadow-clay-card)',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filtered.map((p) => (
          <a
            key={p.href}
            href={p.href}
            className="group relative glass-clay rounded-[32px] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
            style={{ boxShadow: 'var(--shadow-clay-card)' }}
          >
            <div className="relative aspect-[4/3] bg-clay-card-solid p-4 overflow-hidden">
              <div
                className="absolute inset-4 rounded-[24px] bg-clay-canvas overflow-hidden"
                style={{ boxShadow: 'var(--shadow-clay-pressed)' }}
              >
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="absolute inset-0 h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="p-6 flex flex-col gap-2 flex-1">
              <div
                className="flex items-center gap-2 text-xs text-clay-muted uppercase tracking-widest font-bold"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <span>{p.brand}</span>
                <span className="opacity-50">·</span>
                <span>{p.category}</span>
              </div>
              <h3
                className="text-lg sm:text-xl font-extrabold leading-tight tracking-tight group-hover:text-clay-accent transition-colors"
                style={{ fontFamily: 'Nunito, sans-serif' }}
              >
                {p.title}
              </h3>
              <p
                className="text-sm text-clay-muted leading-relaxed font-medium flex-1"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                {p.shortDescription}
              </p>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          className="text-center text-clay-muted font-medium py-12"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          Nessun prodotto in questa categoria.
        </p>
      )}
    </div>
  );
}
