export const bar = {
  name: "Logjko 2.0",
  tagline: "Pub · Cocktail · Notte",
  rating: 4.4,
  reviewCount: 191,
  priceRange: "€10–20",
  phone: "388 649 6996",
  phoneDisplayShort: "388 649 6996",
  phoneHref: "tel:+393886496996",
  address: "Via Teologo Giuseppe Antonino, 7",
  city: "10036 Settimo Torinese TO",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Logjko+2.0+Via+Teologo+Giuseppe+Antonino+7+Settimo+Torinese",
  mapsEmbedUrl:
    "https://maps.google.com/maps?q=Via%20Teologo%20Giuseppe%20Antonino%207%20Settimo%20Torinese&t=&z=16&ie=UTF8&iwloc=&output=embed",
  reviewUrl:
    "https://www.google.com/maps/search/?api=1&query=Logjko+2.0+Via+Teologo+Giuseppe+Antonino+7+Settimo+Torinese",
  plusCode: "4QP9+MW Settimo Torinese",
  instagram: "https://www.instagram.com/logjko2.0/",
  facebook: "https://www.facebook.com/p/Logjko20-100077985985521/",
  services: ["Dine-in", "Asporto", "Consegna no-contact"],
  features: ["LGBTQ+ friendly", "Cucina serale", "Musica live", "Cocktail della casa"],
};

export const hours = [
  { day: "Lunedì", open: "18:00", close: "02:00" },
  { day: "Martedì", open: "18:00", close: "02:00" },
  { day: "Mercoledì", open: "18:00", close: "02:00" },
  { day: "Giovedì", open: "18:00", close: "02:00" },
  { day: "Venerdì", open: "18:00", close: "02:00" },
  { day: "Sabato", open: "18:00", close: "02:00" },
  { day: "Domenica", open: "18:00", close: "02:00" },
];

export const popularTimes = [
  { hour: "18", level: 25 },
  { hour: "19", level: 45 },
  { hour: "20", level: 70 },
  { hour: "21", level: 90 },
  { hour: "22", level: 100 },
  { hour: "23", level: 95 },
  { hour: "00", level: 80 },
  { hour: "01", level: 55 },
  { hour: "02", level: 20 },
];

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  tag?: string;
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
};

export const menu: MenuSection[] = [
  {
    id: "cocktails",
    title: "Cocktail della Casa",
    subtitle: "Creati al bancone, serviti con carattere",
    items: [
      {
        name: "Logjko Negroni",
        description: "Gin, vermouth rosso, Campari, twist d'arancia",
        price: "€9",
        tag: "Signature",
      },
      {
        name: "Settimo Spritz",
        description: "Aperol, prosecco, soda, arancia amara",
        price: "€7",
        tag: "Classico",
      },
      {
        name: "Torinese Sour",
        description: "Whisky, limone, sciroppo di zucchero, albume",
        price: "€10",
      },
      {
        name: "Midnight Espresso",
        description: "Vodka, liquore al caffè, espresso, schiuma",
        price: "€9",
      },
      {
        name: "Amber Mule",
        description: "Vodka, ginger beer, lime, miele di acacia",
        price: "€8",
      },
      {
        name: "Basil Smash",
        description: "Gin, basilico fresco, limone, sciroppo",
        price: "€9",
      },
    ],
  },
  {
    id: "wines",
    title: "I Nostri Vini",
    subtitle: "Selezione in bottiglia e al calice",
    items: [
      {
        name: "Barbera d'Asti DOCG",
        description: "Piemonte — note di ciliegia e spezie",
        price: "€6 / €24",
        tag: "Al calice",
      },
      {
        name: "Nebbiolo Langhe DOC",
        description: "Elegante, tannini setosi, rosa e viola",
        price: "€8 / €32",
      },
      {
        name: "Arneis Roero DOCG",
        description: "Bianco fresco, pesca bianca e mandorla",
        price: "€6 / €22",
      },
      {
        name: "Prosecco Extra Dry",
        description: "Bolle fini, pera e fiori bianchi",
        price: "€5 / €18",
      },
      {
        name: "Champagne Brut",
        description: "Selezione della maison — per le grandi sere",
        price: "€12 / €55",
      },
    ],
  },
  {
    id: "food",
    title: "Cucina & Taglieri",
    subtitle: "Cucina aperta fino a tardi nel weekend",
    items: [
      {
        name: "Tagliere Misto",
        description: "Salumi piemontesi, formaggi, confetture e miele",
        price: "€16",
        tag: "Consigliato",
      },
      {
        name: "Bruschette della Casa",
        description: "Tre gusti: pomodoro, lardo, funghi trifolati",
        price: "€9",
      },
      {
        name: "Patatine Gourmet",
        description: "Con salsa allo yogurt e paprika affumicata",
        price: "€6",
      },
      {
        name: "Burger Logjko",
        description: "Manzo, cheddar, bacon croccante, salsa speciale",
        price: "€14",
      },
      {
        name: "Insalata Mediterranea",
        description: "Rucola, pomodorini, olive, feta, olio EVO",
        price: "€11",
      },
      {
        name: "Toast Club",
        description: "Pollo, uovo, lattuga, pomodoro, maionese",
        price: "€10",
      },
    ],
  },
  {
    id: "birre",
    title: "Birre & Soft",
    subtitle: "Alla spina e in bottiglia",
    items: [
      { name: "IPA Artigianale", description: "Luppolata, agrumata, 6.2%", price: "€6" },
      {
        name: "Lager Premium",
        description: "Fresca e croccante, perfetta con i taglieri",
        price: "€5",
      },
      {
        name: "Stout Irlandese",
        description: "Corposa, note di caffè e cioccolato",
        price: "€6",
      },
      { name: "Analcolici & Soft", description: "Cola, tonica, succhi, acqua", price: "da €3" },
    ],
  },
];

export const reviews = [
  {
    name: "Silvia Marinelli",
    rating: 5,
    date: "2 mesi fa",
    text: "Una piacevole sorpresa e un po' un tuffo nel passato. La cucina è aperta fino a tardi nel weekend. Cibo eccellente e atmosfera calda.",
    tags: ["cibo", "ambiente"],
  },
  {
    name: "Aaron Shilliday",
    rating: 5,
    date: "3 anni fa",
    text: "Nice relaxing atmosphere and great selection of drinks. Perfect spot for an evening out.",
    tags: ["cocktails", "ambiente"],
  },
  {
    name: "Marco R.",
    rating: 5,
    date: "1 mese fa",
    text: "I cocktail della casa sono fantastici, specialmente il Negroni. Musica live il sabato sera — da non perdere!",
    tags: ["cocktails", "live music"],
  },
  {
    name: "Giulia F.",
    rating: 4,
    date: "3 settimane fa",
    text: "Bel locale, staff gentile e prezzi onesti. Lo Spritz è perfetto per l'aperitivo. Torneremo sicuramente.",
    tags: ["spritz", "aperitivo"],
  },
  {
    name: "Luca Bianchi",
    rating: 5,
    date: "2 mesi fa",
    text: "Ambiente inclusivo e rilassato. Ottima selezione di vini piemontesi e taglieri abbondanti. Consigliatissimo!",
    tags: ["vini", "ambiente"],
  },
  {
    name: "Elena Conti",
    rating: 4,
    date: "1 settimana fa",
    text: "Siamo venuti per un compleanno: servizio attento, drink creativi e musica di sottofondo piacevole. Ci siamo trovati benissimo.",
    tags: ["cocktails", "serata"],
  },
];

export const gallery = [
  {
    src: "https://images.pexels.com/photos/12049548/pexels-photo-12049548.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Bancone illuminato di sera",
    category: "vibe",
  },
  {
    src: "https://images.pexels.com/photos/27668709/pexels-photo-27668709.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Aperol Spritz fresco",
    category: "drinks",
  },
  {
    src: "https://images.pexels.com/photos/18408870/pexels-photo-18408870.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Interno elegante del locale",
    category: "vibe",
  },
  {
    src: "https://images.pexels.com/photos/35438980/pexels-photo-35438980.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Tagliere di antipasti italiani",
    category: "food",
  },
  {
    src: "https://images.pexels.com/photos/11522840/pexels-photo-11522840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Cocktail con fetta d'arancia",
    category: "drinks",
  },
  {
    src: "https://images.pexels.com/photos/6174060/pexels-photo-6174060.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Musica live al bar",
    category: "vibe",
  },
  {
    src: "https://images.pexels.com/photos/11838971/pexels-photo-11838971.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Bicchieri di vino al bancone",
    category: "drinks",
  },
  {
    src: "https://images.pexels.com/photos/29068725/pexels-photo-29068725.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Formaggi e prosciutto",
    category: "food",
  },
  {
    src: "https://images.pexels.com/photos/5461573/pexels-photo-5461573.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    alt: "Bancone in legno rustico",
    category: "vibe",
  },
];

export const heroImage =
  "https://images.pexels.com/photos/38082102/pexels-photo-38082102.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600";
