/**
 * i18n string dictionary. English ships live; Spanish is filled and ready —
 * to enable it: add src/pages/es/ page mirrors (or flip prefixDefaultLocale)
 * and mount <LangToggle/> in NavBar. Components read strings via useTranslations().
 */
export const languages = { en: 'English', es: 'Español' } as const;
export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.cart': 'Cart',
    'nav.catalog': 'Catalog',
    'nav.solutions': 'Solutions',
    'nav.cases': 'Case Studies',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'cta.request': 'Request Spec Sheet',
    'cta.quote': 'Get a Quote',
    'cta.browse': 'Browse the index',
    'cta.viewCatalog': 'View full catalog',
    'cta.specSheet': 'Request a spec sheet',
    'cta.talk': 'Talk to engineering',
    'hero.eyebrow': 'High Performance Network Infrastructure',
    'hero.title1': 'Signal that',
    'hero.title2': 'doesn’t',
    'hero.title3': 'negotiate.',
    'hero.sub': 'Structured cabling, fiber backbone, connectors, managed switching, surveillance and access control — engineered to spec and tested end to end.',
    'hero.claim': 'Certified, not claimed.',
    'sec.catalog': 'Catalog',
    'sec.solutions': 'Solutions',
    'sec.backbone': 'Backbone',
    'sec.industries': 'Industries',
    'sec.contact': 'Contact',
    'foot.tagline': 'Network infrastructure and security hardware, engineered to spec and tested end to end. Certified, not claimed.',
    'common.specSheet': 'Spec sheet',
    'common.allFieldReports': 'All field reports',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.cart': 'Carrito',
    'nav.catalog': 'Catálogo',
    'nav.solutions': 'Soluciones',
    'nav.cases': 'Casos de Éxito',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'cta.request': 'Solicitar Ficha Técnica',
    'cta.quote': 'Cotizar',
    'cta.browse': 'Ver el índice',
    'cta.viewCatalog': 'Ver catálogo completo',
    'cta.specSheet': 'Solicitar ficha técnica',
    'cta.talk': 'Hablar con ingeniería',
    'hero.eyebrow': 'Infraestructura de Red de Alto Rendimiento',
    'hero.title1': 'Señal que',
    'hero.title2': 'no',
    'hero.title3': 'se negocia.',
    'hero.sub': 'Cableado estructurado, backbone de fibra, conectores, switching administrado, videovigilancia y control de acceso — diseñados a especificación y probados de extremo a extremo.',
    'hero.claim': 'Certificado, no prometido.',
    'sec.catalog': 'Catálogo',
    'sec.solutions': 'Soluciones',
    'sec.backbone': 'Backbone',
    'sec.industries': 'Industrias',
    'sec.contact': 'Contacto',
    'foot.tagline': 'Infraestructura de red y equipos de seguridad, diseñados a especificación y probados de extremo a extremo. Certificado, no prometido.',
    'common.specSheet': 'Ficha técnica',
    'common.allFieldReports': 'Todos los casos',
  },
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)['en'];
