export interface Translations {
  company: {
    name: string;
    tagline: string;
    description: string;
  };
  nav: {
    home: string;
    about: string;
    team?: string;
    pipeline: string;
    products: string;
    investors: string;
    awards: string;
    blog: string;
    contact: string;
  };
  hero: {
    tagline: string;
    title: string;
    subtitle: string;
    platform: string;
    description: string;
    primary: string;
    secondary: string;
    bottomText: string;
  };
  features: {
    title: string;
    subtitle: string;
    ai: {
      title: string;
      description: string;
    };
    crossSpecies: {
      title: string;
      description: string;
    };
    precision: {
      title: string;
      description: string;
    };
  };
  stats: {
    title: string;
    subtitle: string;
    compounds: { value: string; label: string };
    accuracy: { value: string; label: string };
    time: { value: string; label: string };
    partners: { value: string; label: string };
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    videoTitle: string;
    quote: string;
    researchAreas: {
      title: string;
      areas: string[];
    };
    commitment: {
      title: string;
      items: string[];
    };
  };
  team: {
    title: string;
    subtitle: string;
    subtitle2: string;
    description: string;
  };
  pipeline: {
    title: string;
    subtitle: string;
    chartHeaders: string[];
    dogLongevity: string;
    elderlyDiseases: string;
    projects: {
      paw001: {
        name: string;
        target: string;
        status: string;
        timeline: string[];
      };
      paw002: {
        name: string;
        target: string;
        status: string;
        timeline: string[];
        partner: string;
      };
      paw003: {
        name: string;
        target: string;
        status: string;
        description: string;
      };
      paw004: {
        name: string;
        target: string;
        status: string;
        description: string;
      };
      paw005: {
        name: string;
        target: string;
        status: string;
        description: string;
      };
    };
    details: {
      title: string;
      dogLongevityTitle: string;
      elderlyDiseasesTitle: string;
    };
    academicSupport: {
      title: string;
      papers: {
        natureComm: { journal: string; title: string };
        nature: { journal: string; title: string };
        oxford: { journal: string; title: string };
      };
    };
  };
  products: {
    title: string;
    subtitle: string;
    methylationKit: {
      title: string;
      subtitle: string;
      description: string;
      name: string;
      tag: string;
      price: string;
      features: {
        nonInvasive: { title: string; description: string };
        fastReport: { title: string; description: string };
        accuracy: { title: string; description: string };
        personalized: { title: string; description: string };
      };
      cta: string;
    };
    comingSoon: {
      title: string;
      subtitle: string;
      tag: string;
      name: string;
      description: string;
      features: Array<{ title: string; description: string }>;
      status: string;
      cta: string;
    };
    philosophy: {
      title: string;
      description: string;
      principles: Array<{ title: string; description: string }>;
    };
    imagePlaceholder: string;
  };
  investors: {
    title: string;
    subtitle: string;
    highlights: {
      title: string;
      items: Array<{
        title: string;
        description: string;
      }>;
    };
    milestones: {
      title: string;
      items: Array<{
        year: string;
        event: string;
      }>;
    };
    financials: {
      title: string;
      metrics: Array<{
        value: string;
        label: string;
      }>;
    };
    team: {
      title: string;
      members: Array<{
        name: string;
        title: string;
      }>;
    };
    cta: {
      title: string;
      description: string;
      button: string;
    };
  };
  news: {
    title: string;
    subtitle: string;
    articles: {
      academic: {
        category: string;
        date: string;
        title: string;
        excerpt: string;
        link: string;
      };
      award: {
        category: string;
        date: string;
        title: string;
        excerpt: string;
        link: string;
      };
      product: {
        category: string;
        date: string;
        title: string;
        excerpt: string;
        link: string;
      };
    };
    moreNews: string;
    platforms: Array<{ name: string; url: string }>;
    latest: {
      title: string;
      items: Array<{
        date: string;
        category: string;
        title: string;
        summary: string;
      }>;
      cta: string;
    };
    insights: {
      title: string;
      items: Array<{
        date: string;
        category: string;
        title: string;
        summary: string;
      }>;
      cta: string;
    };
    media: {
      title: string;
      items: Array<{
        date: string;
        source: string;
        title: string;
        summary: string;
      }>;
      cta: string;
    };
    subscribe: {
      title: string;
      description: string;
      placeholder: string;
      button: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      title: string;
      name: string;
      email: string;
      company: string;
      message: string;
      submit: string;
      placeholder: {
        name: string;
        email: string;
        company: string;
        message: string;
      };
    };
    info: {
      title: string;
      address: {
        title: string;
        company: string;
        details: string;
      };
      addressValue: string;
      email: {
        title: string;
        value: string;
      };
      phone: {
        title: string;
        value: string;
      };
    };
    hours: {
      title: string;
      schedule: Array<{ days: string; time: string }>;
    };
    business: {
      title: string;
      description: string;
      email: string;
    };
    social: {
      title: string;
      linkedin: string;
      xiaohongshu: string;
      platforms: Array<{ name: string; url: string; icon: string }>;
    };
  };
  footer: {
    company: {
      name: string;
      tagline: string;
    };
    sections: {
      company: string;
      products: string;
      resources: string;
    };
    links: {
      about: string;
      team: string;
      pipeline: string;
      careers: string;
      paw001: string;
      methylation: string;
      blog: string;
      investors: string;
      contact: string;
    };
    joinUs: {
      title: string;
      careers: string;
      campus: string;
      global: string;
    };
    copyright: string;
    privacy: string;
    terms: string;
  };
}

// 语言类型
export type Language = 'zh' | 'en';

// 导入翻译文件
import zhTranslations from '../locales/zh/common.json';
import enTranslations from '../locales/en/common.json';

// 获取翻译
export function getTranslations(language: Language): any {
  if (language === 'zh') {
    return zhTranslations;
  } else {
    return enTranslations;
  }
} 