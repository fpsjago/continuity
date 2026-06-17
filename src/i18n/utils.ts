import { ui, defaultLang, type Lang, type UIKey } from './ui';

/** Detect locale from the URL path (works under a deploy base like /continuity). */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').find((p) => p in ui);
  return (seg as Lang) || (defaultLang as Lang);
}

/** t() bound to a locale, falling back to the default language per key. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang as Lang][key];
  };
}

/** Build a locale-aware href (prefixes /es for non-default). */
export function localizedPath(path: string, lang: Lang, base = '/'): string {
  const b = base.replace(/\/?$/, '/');
  const clean = path.replace(/^\//, '');
  return lang === defaultLang ? `${b}${clean}` : `${b}${lang}/${clean}`;
}
