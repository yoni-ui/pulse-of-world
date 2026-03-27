export interface VariantMeta {
  title: string;
  description: string;
  keywords: string;
  url: string;
  siteName: string;
  shortName: string;
  /** Short word shown next to the header logo (e.g. RADAR, TECH) */
  headerLogoWord: string;
  subject: string;
  classification: string;
  categories: string[];
  features: string[];
  /** Open Graph / Twitter overrides (defaults to title/description if omitted) */
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  ogImage?: string;
}

export const VARIANT_META: { full: VariantMeta; [k: string]: VariantMeta } = {
  full: {
    title: 'PulseOfGlobe AI — Real-Time Global Intelligence Platform',
    description:
      'PulseOfGlobe AI transforms global data, news, and sentiment into real-time insights. Track world trends, risks, and opportunities across countries and industries.',
    keywords:
      'global intelligence, AI analytics, world trends, sentiment analysis, data insights, geopolitics, economic trends, AI platform, global dashboard',
    url: 'https://pulseofglobe.ai/',
    siteName: 'PulseOfGlobe AI',
    shortName: 'PulseOfGlobe AI',
    headerLogoWord: 'PULSE',
    subject: 'Real-Time Global Intelligence Platform',
    classification: 'AI Intelligence Platform, Global Dashboard, Business Application',
    ogTitle: 'PulseOfGlobe AI — See the Pulse of the World in Real-Time',
    ogDescription:
      'Understand global events, sentiment, and trends as they happen. AI-powered insights across countries, economies, and industries.',
    twitterTitle: 'PulseOfGlobe AI — Real-Time Global Intelligence',
    twitterDescription: 'Track global sentiment, risks, and trends with AI-powered insights.',
    ogImage: 'https://pulseofglobe.ai/og-image.jpg',
    categories: ['news', 'productivity'],
    features: [
      'Real-time news aggregation',
      'Stock market tracking',
      'Military flight monitoring',
      'Ship AIS tracking',
      'Earthquake alerts',
      'Protest tracking',
      'Power outage monitoring',
      'Oil price analytics',
      'Government spending data',
      'Prediction markets',
      'Infrastructure monitoring',
      'Geopolitical intelligence',
    ],
  },
  tech: {
    title: 'Tech Monitor - Real-Time AI & Tech Industry Dashboard',
    description: 'Real-time AI and tech industry dashboard tracking tech giants, AI labs, startup ecosystems, funding rounds, and tech events worldwide.',
    keywords: 'tech dashboard, AI industry, startup ecosystem, tech companies, AI labs, venture capital, tech events, tech conferences, cloud infrastructure, datacenters, tech layoffs, funding rounds, unicorns, FAANG, tech HQ, accelerators, Y Combinator, tech news',
    url: 'https://tech.worldmonitor.app/',
    siteName: 'Tech Monitor',
    shortName: 'TechMonitor',
    headerLogoWord: 'TECH',
    subject: 'AI, Tech Industry, and Startup Ecosystem Intelligence',
    classification: 'Tech Dashboard, AI Tracker, Startup Intelligence',
    categories: ['news', 'business'],
    features: [
      'Tech news aggregation',
      'AI lab tracking',
      'Startup ecosystem mapping',
      'Tech HQ locations',
      'Conference & event calendar',
      'Cloud infrastructure monitoring',
      'Datacenter mapping',
      'Tech layoff tracking',
      'Funding round analytics',
      'Tech stock tracking',
      'Service status monitoring',
    ],
  },
  happy: {
    title: 'Happy Monitor - Good News & Global Progress',
    description: 'Curated positive news, progress data, and uplifting stories from around the world.',
    keywords: 'good news, positive news, global progress, happy news, uplifting stories, human achievement, science breakthroughs, conservation wins',
    url: 'https://happy.worldmonitor.app/',
    siteName: 'Happy Monitor',
    shortName: 'HappyMonitor',
    headerLogoWord: 'HAPPY',
    subject: 'Good News, Global Progress, and Human Achievement',
    classification: 'Positive News Dashboard, Progress Tracker',
    categories: ['news', 'lifestyle'],
    features: [
      'Curated positive news',
      'Global progress tracking',
      'Live humanity counters',
      'Science breakthrough feed',
      'Conservation tracker',
      'Renewable energy dashboard',
    ],
  },
  finance: {
    title: 'Finance Monitor - Real-Time Markets & Trading Dashboard',
    description: 'Real-time finance and trading dashboard tracking global markets, stock exchanges, central banks, commodities, forex, crypto, and economic indicators worldwide.',
    keywords: 'finance dashboard, trading dashboard, stock market, forex, commodities, central banks, crypto, economic indicators, market news, financial centers, stock exchanges, bonds, derivatives, fintech, hedge funds, IPO tracker, market analysis',
    url: 'https://finance.worldmonitor.app/',
    siteName: 'Finance Monitor',
    shortName: 'FinanceMonitor',
    headerLogoWord: 'FINANCE',
    subject: 'Global Markets, Trading, and Financial Intelligence',
    classification: 'Finance Dashboard, Market Tracker, Trading Intelligence',
    categories: ['finance', 'news'],
    features: [
      'Real-time market data',
      'Stock exchange mapping',
      'Central bank monitoring',
      'Commodity price tracking',
      'Forex & currency news',
      'Crypto & digital assets',
      'Economic indicator alerts',
      'IPO & earnings tracking',
      'Financial center mapping',
      'Sector heatmap',
      'Market radar signals',
    ],
  },
  commodity: {
    title: 'Commodity Monitor - Real-Time Commodity Markets & Supply Chain Dashboard',
    description: 'Real-time commodity markets dashboard tracking mining sites, processing plants, commodity ports, supply chains, and global commodity trade flows.',
    keywords: 'commodity dashboard, mining sites, processing plants, commodity ports, supply chain, commodity markets, oil, gas, metals, agriculture, mining operations, commodity trade, logistics, infrastructure, resource tracking, commodity prices, futures markets',
    url: 'https://commodity.worldmonitor.app/',
    siteName: 'Commodity Monitor',
    shortName: 'CommodityMonitor',
    headerLogoWord: 'COMMODITY',
    subject: 'Commodity Markets, Mining, and Supply Chain Intelligence',
    classification: 'Commodity Dashboard, Supply Chain Tracker, Resource Intelligence',
    categories: ['finance', 'business'],
    features: [
      'Mining site tracking',
      'Processing plant monitoring',
      'Commodity port mapping',
      'Supply chain visualization',
      'Commodity price tracking',
      'Trade flow analysis',
      'Resource extraction monitoring',
      'Logistics infrastructure',
      'Commodity market news',
      'Futures market data',
    ],
  },
};
