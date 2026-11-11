import type { Dictionary } from "../types";

export const en: Dictionary = {
  meta: {
    title: "Halal Open Facts: the halal breakdown of your food and cosmetics",
    description:
      "Scan or search a product. Every ingredient and additive is analysed (halal, doubtful, haram) with the source of each verdict. Open, collaborative database.",
    ogAlt: "Halal Open Facts: understand what's in your products, ingredient by ingredient",
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    languageSwitcher: "Choose language",
    opensNewTab: "(opens in a new tab)",
  },
  nav: {
    how: "How it works",
    verdicts: "Verdicts",
    demo: "Example",
    openData: "Open data",
    contribute: "Contribute",
    faq: "FAQ",
  },
  hero: {
    eyebrow: "Food and cosmetics · open data",
    title: "Know what's really inside your product.",
    subtitle:
      "Scan a barcode or search for a product: each ingredient is analysed and marked halal, doubtful or haram, with the source of the verdict. So you can decide with full knowledge.",
    ctaSearch: "Search a product",
    ctaScan: "Scan a barcode",
    trust: ["Sources shown for every verdict", "Open, reusable data", "Built by the community"],
    mockupLabel: "App preview: a product page marked “Doubtful” with three analysed ingredients",
  },
  search: {
    title: "Search a product",
    projectLabel: "Product type",
    inputLabel: "Name, brand or barcode",
    placeholder: "e.g. biscuits, 3017620422003",
    submit: "Search",
    loading: "Searching…",
    empty: "No product found for “{q}”. You can add it to the database.",
    error: "Search is temporarily unavailable. Please try again shortly.",
    results: "{n} result(s) for “{q}”",
    minChars: "Type at least 2 characters.",
    seeAll: "See all results",
  },
  projects: {
    eyebrow: "Two sister projects",
    title: "What you eat, what you apply",
    lead: "Same method, same statuses, same transparency. Pick your starting point.",
    food: {
      name: "Halal Open Food Facts",
      tag: "Food",
      description:
        "Biscuits, sweets, ready meals… Spot gelatines, flavourings, emulsifiers and additives of uncertain origin.",
      watchlistLabel: "Often flagged",
      watchlist: ["Gelatine", "E471", "E120 (carmine)", "Flavourings"],
      cta: "Explore food",
    },
    beauty: {
      name: "Halal Open Beauty Facts",
      tag: "Cosmetics",
      description: "Creams, lipsticks, shampoos… Identify collagen, keratin, carmine and alcohols.",
      watchlistLabel: "Often flagged",
      watchlist: ["CI 75470 (carmine)", "Collagen", "Keratin", "Alcohol denat."],
      cta: "Explore cosmetics",
    },
  },
  how: {
    eyebrow: "How it works",
    title: "From barcode to verdict in three steps",
    lead: "No need to memorise E-numbers: the tool reads the label for you and shows its reasoning.",
    steps: [
      { title: "Scan or search", text: "Point your camera at the barcode, or type the product name." },
      {
        title: "The ingredients are analysed",
        text: "Each ingredient and additive is matched to a documented entry: possible origin, known opinions, sources.",
      },
      {
        title: "Read a detailed verdict",
        text: "An overall status, then the detail ingredient by ingredient, with the source of each opinion.",
      },
    ],
  },
  verdicts: {
    eyebrow: "Verdict system",
    title: "Four statuses, always explained",
    lead: "Each status pairs a colour, an icon and a word. A product's overall status is that of its most problematic ingredient.",
    labels: { halal: "Halal", doubtful: "Doubtful", haram: "Haram", unknown: "Unknown" },
    descriptions: {
      halal: "No problematic ingredient identified according to the sources consulted.",
      doubtful: "An ingredient may be of animal or alcoholic origin depending on the maker, or scholars disagree.",
      haram: "At least one ingredient is considered impermissible by the sources consulted (pork, for example).",
      unknown: "Incomplete ingredient list or ingredient not yet documented. Your contribution can help.",
    },
    disclaimerTitle: "A decision aid, not a fatwa",
    disclaimer:
      "Opinions vary between schools of jurisprudence and scholars. We show our sources and flag disagreements instead of settling them. When in doubt, consult a knowledgeable person you trust.",
  },
  demo: {
    eyebrow: "Product page preview",
    title: "Every verdict shows its reasoning",
    lead: "Open an ingredient to see its origin, its source and, where relevant, differences between schools.",
    tabsLabel: "Choose an example product",
    tabFood: "Food",
    tabBeauty: "Cosmetic",
    overall: "Overall status",
    overallHint: "Set by the most problematic ingredient.",
    ingredients: "Analysed ingredients",
    flagged: "{n} ingredient(s) to check",
    origin: "Origin",
    source: "Source",
    schools: "Differences",
    fictional: "Fictional products, shown for illustration.",
    food: {
      name: "Fruit gummies",
      brand: "Example brand",
      category: "Confectionery",
      ingredients: [
        {
          name: "Glucose syrup",
          verdict: "halal",
          origin: "Plant-based (wheat or corn starch).",
          source: "Halal Open Facts ingredient entry.",
        },
        {
          name: "Pork gelatine",
          verdict: "haram",
          origin: "Animal (pork), stated on the pack.",
          source: "Qur'an, Surah Al-Baqarah (2:173); consensus of the schools on pork.",
        },
        {
          name: "Carmine",
          code: "E120",
          verdict: "doubtful",
          origin: "Animal: dye extracted from cochineal (insect).",
          source: "E120 additive entry, summary of opinions published by Halal Open Facts.",
          schools: "Accepted by some scholars, notably in the Maliki school; considered impermissible by others.",
        },
        {
          name: "Flavouring",
          verdict: "unknown",
          origin: "Not specified: the carrier (alcohol or not) isn't stated by the maker.",
          source: "Missing information on the pack; entry awaiting contribution.",
        },
        {
          name: "Citric acid",
          code: "E330",
          verdict: "halal",
          origin: "Fermentation of plant sugars.",
          source: "E330 additive entry.",
        },
      ],
    },
    beauty: {
      name: "Satin lipstick",
      brand: "Example brand",
      category: "Make-up",
      ingredients: [
        {
          name: "Castor oil",
          code: "Ricinus communis seed oil",
          verdict: "halal",
          origin: "Plant-based.",
          source: "Halal Open Facts ingredient entry.",
        },
        {
          name: "Beeswax",
          code: "Cera alba",
          verdict: "halal",
          origin: "Produced by bees.",
          source: "Halal Open Facts ingredient entry.",
        },
        {
          name: "Carmine",
          code: "CI 75470",
          verdict: "doubtful",
          origin: "Animal: dye extracted from cochineal (insect).",
          source: "CI 75470 entry, summary of opinions published by Halal Open Facts.",
          schools:
            "For external use, many scholars tolerate it; others advise against it. Views also differ between schools.",
        },
        {
          name: "Tocopherol",
          code: "Tocopherol",
          verdict: "halal",
          origin: "Usually plant-based (vitamin E).",
          source: "Halal Open Facts ingredient entry.",
        },
      ],
    },
  },
  openData: {
    eyebrow: "Transparency",
    title: "Open, sourced, verifiable",
    lead: "A verdict is only worth something if it can be checked. Everything is public: data, sources and method.",
    points: [
      {
        title: "Open data",
        text: "Product entries are published under an open licence (ODbL): browse, download and reuse them.",
      },
      {
        title: "Cited sources",
        text: "Every status links to its source: reference text, published opinion or documented summary.",
      },
      {
        title: "Public method",
        text: "The rules that produce a verdict are described here and discussed in the open.",
      },
      {
        title: "Open source",
        text: "The code is on GitHub: anyone can audit it and suggest improvements.",
      },
    ],
    methodologyTitle: "How a status is computed",
    methodology: [
      "The ingredient list declared by the maker is read and split.",
      "Each ingredient is linked to a documented, sourced entry.",
      "If the origin depends on the maker or opinions differ, the ingredient is marked “doubtful” and the opinions are detailed.",
      "The overall status is that of the most problematic ingredient.",
    ],
    apiCta: "Explore the API",
  },
  stats: {
    eyebrow: "In numbers",
    title: "A database that grows with its community",
    lead: "The figures below come straight from the database.",
    products: "Products listed",
    ingredients: "Documented ingredients and additives",
    contributors: "Contributors",
    loading: "Loading the latest figures…",
    fallback: "Indicative figures: live data is temporarily unavailable.",
    live: "Live data, updated on {date}.",
    popularTitle: "Most viewed products",
  },
  contribute: {
    eyebrow: "Contribute",
    title: "The database gets better thanks to you",
    lead: "A missing product, a mistake, a translation: every contribution is reviewed, then benefits everyone.",
    add: {
      title: "Add a product",
      text: "Take photos of the pack and the ingredient list: the entry is created in minutes.",
      cta: "Add a product",
    },
    report: {
      title: "Report a mistake",
      text: "A misclassified ingredient or a missing source? Report it so it gets fixed.",
      cta: "Report a mistake",
    },
    code: {
      title: "Contribute to the code",
      text: "Development, design, translation: the project is open, join us on GitHub.",
      cta: "View on GitHub",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Frequently asked questions",
    items: [
      {
        question: "Are the verdicts reliable?",
        answer:
          "They rely on the ingredient list declared by the maker and on a documented ingredient database. They can be wrong: recipes change, origins are not always stated. That's why every verdict shows its source and can be reported in one click.",
      },
      {
        question: "Why do opinions differ between schools of jurisprudence?",
        answer:
          "Some questions (insects, alcohol used as a solvent, transformation of a substance) are treated differently by the Hanafi, Maliki, Shafi'i and Hanbali schools, and by contemporary scholars. We don't settle them: the ingredient is marked “doubtful” and the detail lists known opinions with their sources.",
      },
      {
        question: "Does a “halal” status replace a certification?",
        answer:
          "No. The tool analyses the ingredient list. It cannot check how meat was slaughtered or cross-contamination in factories. Only a certification body can rule on those points.",
      },
      {
        question: "What happens to my data?",
        answer:
          "Searching and viewing products requires no account. Contributions (photos, corrections) are public since they feed an open database; you can contribute under a pseudonym. Details are in the privacy policy.",
      },
      {
        question: "The product I'm looking for doesn't exist. What can I do?",
        answer:
          "Add it! A few photos of the pack and ingredient list are enough. The entry is analysed automatically, then reviewed by the community.",
      },
    ],
  },
  footer: {
    tagline: "Understand what's in your products, ingredient by ingredient, transparently.",
    projects: "Projects",
    resources: "Resources",
    community: "Community",
    legal: "Information",
    methodology: "Methodology",
    api: "Public API",
    github: "GitHub",
    contribute: "Contribute",
    legalNotice: "Legal notice",
    privacy: "Privacy",
    contact: "Contact",
    language: "Language",
    license: "Data under ODbL · Open-source code",
  },
  legalPage: {
    title: "Legal notice and privacy",
    noticeTitle: "Legal notice",
    notice: "[To be completed] Site publisher, publication manager, host and contact details.",
    privacyTitle: "Privacy policy",
    privacy: "[To be completed] Data collected, purposes, retention period, data subject rights and controller contact.",
    back: "Back to home",
  },
};
