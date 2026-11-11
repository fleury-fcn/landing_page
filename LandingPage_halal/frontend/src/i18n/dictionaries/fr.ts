import type { Dictionary } from "../types";

export const fr: Dictionary = {
  meta: {
    title: "Halal Open Facts : la composition halal de vos aliments et cosmétiques",
    description:
      "Scannez ou recherchez un produit. Chaque ingrédient et additif est analysé (halal, douteux, haram) avec la source de chaque verdict. Base ouverte et collaborative.",
    ogAlt: "Halal Open Facts : comprendre la composition de ses produits, ingrédient par ingrédient",
  },
  a11y: {
    skipToContent: "Aller au contenu",
    mainNav: "Navigation principale",
    languageSwitcher: "Choisir la langue",
    opensNewTab: "(s'ouvre dans un nouvel onglet)",
  },
  nav: {
    how: "Fonctionnement",
    verdicts: "Verdicts",
    demo: "Exemple",
    openData: "Open data",
    contribute: "Contribuer",
    faq: "FAQ",
  },
  hero: {
    eyebrow: "Aliments et cosmétiques · données ouvertes",
    title: "Sachez ce que contient vraiment votre produit.",
    subtitle:
      "Scannez un code-barres ou cherchez un produit : chaque ingrédient est analysé et classé halal, douteux ou haram, avec la source du verdict. Pour décider en connaissance de cause.",
    ctaSearch: "Rechercher un produit",
    ctaScan: "Scanner un code-barres",
    trust: ["Sources citées pour chaque verdict", "Données ouvertes et réutilisables", "Base enrichie par la communauté"],
    mockupLabel:
      "Aperçu de l'application : fiche d'un produit au statut « Douteux » avec trois ingrédients analysés",
  },
  search: {
    title: "Rechercher un produit",
    projectLabel: "Type de produit",
    inputLabel: "Nom, marque ou code-barres",
    placeholder: "ex. biscuits, 3017620422003",
    submit: "Rechercher",
    loading: "Recherche en cours…",
    empty: "Aucun produit trouvé pour « {q} ». Vous pouvez l'ajouter à la base.",
    error: "La recherche est momentanément indisponible. Réessayez dans un instant.",
    results: "{n} résultat(s) pour « {q} »",
    minChars: "Saisissez au moins 2 caractères.",
    seeAll: "Voir tous les résultats",
  },
  projects: {
    eyebrow: "Deux projets jumeaux",
    title: "Ce que vous mangez, ce que vous appliquez",
    lead: "Même méthode, mêmes statuts, même transparence. Choisissez votre point d'entrée.",
    food: {
      name: "Halal Open Food Facts",
      tag: "Alimentation",
      description:
        "Biscuits, confiseries, plats préparés… Repérez les gélatines, arômes, émulsifiants et additifs d'origine incertaine.",
      watchlistLabel: "Souvent signalés",
      watchlist: ["Gélatine", "E471", "E120 (carmin)", "Arômes"],
      cta: "Explorer les aliments",
    },
    beauty: {
      name: "Halal Open Beauty Facts",
      tag: "Cosmétiques",
      description:
        "Crèmes, rouges à lèvres, shampoings… Identifiez le collagène, la kératine, le carmin et les alcools.",
      watchlistLabel: "Souvent signalés",
      watchlist: ["CI 75470 (carmin)", "Collagène", "Kératine", "Alcohol denat."],
      cta: "Explorer les cosmétiques",
    },
  },
  how: {
    eyebrow: "Fonctionnement",
    title: "Du code-barres au verdict, en trois étapes",
    lead: "Pas besoin de connaître les codes E par cœur : l'outil fait la lecture pour vous, et vous montre son raisonnement.",
    steps: [
      {
        title: "Scannez ou recherchez",
        text: "Visez le code-barres avec l'appareil photo, ou tapez le nom du produit.",
      },
      {
        title: "La composition est analysée",
        text: "Chaque ingrédient et additif est rapproché d'une fiche documentée : origine possible, avis connus, sources.",
      },
      {
        title: "Vous lisez un verdict détaillé",
        text: "Un statut global, puis le détail ingrédient par ingrédient, avec la source de chaque avis.",
      },
    ],
  },
  verdicts: {
    eyebrow: "Système de verdict",
    title: "Quatre statuts, toujours expliqués",
    lead: "Chaque statut associe une couleur, une icône et un mot. Le statut global d'un produit est celui de son ingrédient le plus problématique.",
    labels: { halal: "Halal", doubtful: "Douteux", haram: "Haram", unknown: "Inconnu" },
    descriptions: {
      halal: "Aucun ingrédient problématique identifié d'après les sources consultées.",
      doubtful:
        "Un ingrédient peut être d'origine animale ou alcoolisée selon le fabricant, ou les avis des savants divergent.",
      haram: "Au moins un ingrédient est considéré comme non permis par les sources consultées (porc, par exemple).",
      unknown: "Composition incomplète ou ingrédient pas encore documenté. Votre contribution peut aider.",
    },
    disclaimerTitle: "Une aide à la décision, pas une fatwa",
    disclaimer:
      "Les avis varient selon les écoles juridiques et les savants. Nous affichons nos sources et signalons les divergences au lieu de trancher. En cas de doute, rapprochez-vous d'une personne de science en qui vous avez confiance.",
  },
  demo: {
    eyebrow: "Aperçu d'une fiche",
    title: "Chaque verdict montre son raisonnement",
    lead: "Ouvrez un ingrédient pour voir son origine, sa source et, s'il y a lieu, les divergences entre écoles.",
    tabsLabel: "Choisir un exemple de produit",
    tabFood: "Aliment",
    tabBeauty: "Cosmétique",
    overall: "Statut global",
    overallHint: "Déterminé par l'ingrédient le plus problématique.",
    ingredients: "Ingrédients analysés",
    flagged: "{n} ingrédient(s) à vérifier",
    origin: "Origine",
    source: "Source",
    schools: "Divergences",
    fictional: "Produits fictifs, présentés à titre d'illustration.",
    food: {
      name: "Bonbons gélifiés aux fruits",
      brand: "Marque exemple",
      category: "Confiserie",
      ingredients: [
        {
          name: "Sirop de glucose",
          verdict: "halal",
          origin: "Végétale (amidon de blé ou de maïs).",
          source: "Fiche ingrédient Halal Open Facts.",
        },
        {
          name: "Gélatine de porc",
          verdict: "haram",
          origin: "Animale (porc), indiquée sur l'emballage.",
          source: "Coran, sourate Al-Baqara (2:173) ; consensus des écoles sur le porc.",
        },
        {
          name: "Carmin",
          code: "E120",
          verdict: "doubtful",
          origin: "Animale : colorant extrait de la cochenille (insecte).",
          source: "Fiche additif E120, synthèse des avis publiée par Halal Open Facts.",
          schools:
            "Admis par une partie des savants, notamment de l'école malikite ; jugé non permis par d'autres.",
        },
        {
          name: "Arôme",
          verdict: "unknown",
          origin: "Non précisée : le support (alcool ou non) n'est pas indiqué par le fabricant.",
          source: "Information manquante sur l'emballage ; fiche en attente de contribution.",
        },
        {
          name: "Acide citrique",
          code: "E330",
          verdict: "halal",
          origin: "Fermentation de sucres d'origine végétale.",
          source: "Fiche additif E330.",
        },
      ],
    },
    beauty: {
      name: "Rouge à lèvres satiné",
      brand: "Marque exemple",
      category: "Maquillage",
      ingredients: [
        {
          name: "Huile de ricin",
          code: "Ricinus communis seed oil",
          verdict: "halal",
          origin: "Végétale.",
          source: "Fiche ingrédient Halal Open Facts.",
        },
        {
          name: "Cire d'abeille",
          code: "Cera alba",
          verdict: "halal",
          origin: "Produite par les abeilles.",
          source: "Fiche ingrédient Halal Open Facts.",
        },
        {
          name: "Carmin",
          code: "CI 75470",
          verdict: "doubtful",
          origin: "Animale : colorant extrait de la cochenille (insecte).",
          source: "Fiche CI 75470, synthèse des avis publiée par Halal Open Facts.",
          schools:
            "Pour un usage externe, de nombreux savants le tolèrent ; d'autres le déconseillent. Les avis diffèrent aussi selon les écoles.",
        },
        {
          name: "Tocophérol",
          code: "Tocopherol",
          verdict: "halal",
          origin: "Généralement végétale (vitamine E).",
          source: "Fiche ingrédient Halal Open Facts.",
        },
      ],
    },
  },
  openData: {
    eyebrow: "Transparence",
    title: "Ouvert, sourcé, vérifiable",
    lead: "Un verdict n'a de valeur que si l'on peut le vérifier. Tout est public : les données, les sources et la méthode.",
    points: [
      {
        title: "Données ouvertes",
        text: "Les fiches produits sont publiées sous licence ouverte (ODbL) : vous pouvez les consulter, les télécharger et les réutiliser.",
      },
      {
        title: "Sources citées",
        text: "Chaque statut renvoie à sa source : texte de référence, avis publié ou synthèse documentée.",
      },
      {
        title: "Méthode publique",
        text: "Les règles qui produisent un verdict sont décrites ci-contre et discutées ouvertement.",
      },
      {
        title: "Code ouvert",
        text: "Le code est publié sur GitHub : chacun peut l'auditer et proposer des améliorations.",
      },
    ],
    methodologyTitle: "Comment un statut est calculé",
    methodology: [
      "La liste d'ingrédients déclarée par le fabricant est lue et découpée.",
      "Chaque ingrédient est rattaché à une fiche documentée et sourcée.",
      "Si l'origine dépend du fabricant ou si les avis divergent, l'ingrédient est marqué « douteux » et les avis sont détaillés.",
      "Le statut global est celui de l'ingrédient le plus problématique.",
    ],
    apiCta: "Explorer l'API",
  },
  stats: {
    eyebrow: "En chiffres",
    title: "Une base qui grandit avec sa communauté",
    lead: "Les chiffres ci-dessous proviennent directement de la base.",
    products: "Produits référencés",
    ingredients: "Ingrédients et additifs documentés",
    contributors: "Contributeurs et contributrices",
    loading: "Chargement des chiffres à jour…",
    fallback: "Chiffres indicatifs : les données en direct sont momentanément indisponibles.",
    live: "Données en direct, mises à jour le {date}.",
    popularTitle: "Produits les plus consultés",
  },
  contribute: {
    eyebrow: "Contribuer",
    title: "La base s'améliore grâce à vous",
    lead: "Un produit manquant, une erreur, une traduction : chaque contribution est relue puis profite à tout le monde.",
    add: {
      title: "Ajouter un produit",
      text: "Photographiez l'emballage et la liste d'ingrédients : la fiche est créée en quelques minutes.",
      cta: "Ajouter un produit",
    },
    report: {
      title: "Signaler une erreur",
      text: "Un ingrédient mal classé ou une source manquante ? Signalez-le pour qu'il soit corrigé.",
      cta: "Signaler une erreur",
    },
    code: {
      title: "Contribuer au code",
      text: "Développement, design, traduction : le projet est ouvert, rejoignez-nous sur GitHub.",
      cta: "Voir sur GitHub",
    },
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes",
    items: [
      {
        question: "Les verdicts sont-ils fiables ?",
        answer:
          "Ils reposent sur la composition déclarée par le fabricant et sur une base d'ingrédients documentée. Ils peuvent comporter des erreurs : une recette change, une origine n'est pas précisée. C'est pourquoi chaque verdict affiche sa source et peut être signalé en un clic.",
      },
      {
        question: "Pourquoi les avis diffèrent-ils d'une école juridique à l'autre ?",
        answer:
          "Certaines questions (insectes, alcool utilisé comme solvant, transformation d'une substance) sont traitées différemment par les écoles hanafite, malikite, chaféite et hanbalite, ainsi que par les savants contemporains. Nous ne tranchons pas : l'ingrédient est marqué « douteux » et le détail présente les avis connus avec leurs sources.",
      },
      {
        question: "Un statut « halal » remplace-t-il une certification ?",
        answer:
          "Non. L'outil analyse la liste d'ingrédients. Il ne peut vérifier ni le mode d'abattage des viandes, ni les contaminations croisées en usine. Pour ces points, seul un organisme de certification peut se prononcer.",
      },
      {
        question: "Que deviennent mes données ?",
        answer:
          "La recherche et la consultation des fiches ne demandent pas de compte. Les contributions (photos, corrections) sont publiques puisqu'elles alimentent une base ouverte ; vous pouvez contribuer sous pseudonyme. Le détail figure dans la politique de confidentialité.",
      },
      {
        question: "Le produit que je cherche n'existe pas. Que faire ?",
        answer:
          "Ajoutez-le ! Quelques photos de l'emballage et de la liste d'ingrédients suffisent. La fiche est analysée automatiquement puis relue par la communauté.",
      },
    ],
  },
  footer: {
    tagline: "Comprendre la composition de ses produits, ingrédient par ingrédient, en toute transparence.",
    projects: "Projets",
    resources: "Ressources",
    community: "Communauté",
    legal: "Informations",
    methodology: "Méthodologie",
    api: "API publique",
    github: "GitHub",
    contribute: "Contribuer",
    legalNotice: "Mentions légales",
    privacy: "Confidentialité",
    contact: "Contact",
    language: "Langue",
    license: "Données sous licence ODbL · Code open source",
  },
  legalPage: {
    title: "Mentions légales et confidentialité",
    noticeTitle: "Mentions légales",
    notice:
      "[À compléter] Éditeur du site, responsable de la publication, hébergeur et coordonnées de contact.",
    privacyTitle: "Politique de confidentialité",
    privacy:
      "[À compléter] Données collectées, finalités, durée de conservation, droits des personnes et contact du responsable de traitement.",
    back: "Retour à l'accueil",
  },
};
