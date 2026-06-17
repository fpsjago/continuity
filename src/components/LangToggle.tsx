import { defaultLang, type Lang } from '../i18n/ui';

const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/**
 * EN | ES switcher. READY but not mounted in NavBar yet — the live demo ships
 * English-only. To enable: create src/pages/es/ mirrors, then render
 * <LangToggle lang={currentLang} path={relativePath} client:load /> in NavBar.
 */
export default function LangToggle({ lang = defaultLang as Lang, path = '' }: { lang?: Lang; path?: string }) {
  const langs: Lang[] = ['en', 'es'];
  return (
    <div className="flex items-center gap-2 font-[var(--font-mono)] text-[0.7rem]" aria-label="Language">
      {langs.map((l, i) => {
        const href = l === 'en' ? `${base}${path}` : `${base}es/${path}`;
        const active = l === lang;
        return (
          <span key={l} className="flex items-center gap-2">
            <a
              href={href}
              aria-current={active ? 'true' : undefined}
              className={active ? 'text-[var(--ink)] font-semibold' : 'text-[var(--muted)] hover:text-[var(--ink)] transition-colors'}
            >
              {l.toUpperCase()}
            </a>
            {i === 0 && <span className="text-[var(--line-strong)]">/</span>}
          </span>
        );
      })}
    </div>
  );
}
