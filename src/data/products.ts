import { type CategorySlug } from "@/data/categories";

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  promoPrice?: number;
  category: CategorySlug;
  tags: string[];
  materials: string[];
  colors: string[];
  images: string[];
  description: string;
  details: string[];
  inStock: boolean;
  featured: boolean;
  createdAt: string;
};

export const fallbackProductImage = "/brand/mood-collection.png";

export const products: Product[] = [
  {
    id: "prd-brinco-aurora",
    name: "Brinco Aurora",
    slug: "brinco-aurora",
    price: 42,
    promoPrice: 36,
    category: "brincos",
    tags: ["Novo", "Brilho"],
    materials: ["banho champanhe", "zircônia delicada"],
    colors: ["champanhe", "pérola"],
    images: ["/products/brinco-aurora-1.jpg", fallbackProductImage],
    description: "Brilho champanhe com volume suave e pontos de luz.",
    details: [
      "Banho champanhe com proteção antialérgica",
      "Base leve para uso o dia todo",
      "Combina com penteados presos e soltos",
    ],
    inStock: true,
    featured: true,
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: "prd-brinco-brisa-delicada",
    name: "Brinco Brisa Delicada",
    slug: "brinco-brisa-delicada",
    price: 28,
    category: "brincos",
    tags: ["Minimal"],
    materials: ["aço hipoalergênico", "banho champanhe"],
    colors: ["areia", "champanhe"],
    images: ["/products/brinco-brisa-delicada-1.jpg", fallbackProductImage],
    description: "Forma orgânica leve, ideal para uso diário com conforto.",
    details: [
      "Peso ultraleve",
      "Formato orgânico com bordas macias",
      "Fecho seguro tipo tarraxa",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "prd-brinco-perola-nuvem",
    name: "Brinco Pérola Nuvem",
    slug: "brinco-perola-nuvem",
    price: 48,
    promoPrice: 44,
    category: "brincos",
    tags: ["Pérola", "Presenteável"],
    materials: ["pérola cultivada", "banho champanhe"],
    colors: ["pérola", "champanhe"],
    images: ["/products/brinco-perola-nuvem-1.jpg", fallbackProductImage],
    description: "Dupla de pérolas com brilho acetinado e haste discreta.",
    details: [
      "Pérolas selecionadas",
      "Acabamento acetinado",
      "Design atemporal para presentear",
    ],
    inStock: true,
    featured: true,
    createdAt: "2025-01-06T10:00:00Z",
  },
  {
    id: "prd-brinco-raio-sol",
    name: "Brinco Raio de Sol",
    slug: "brinco-raio-de-sol",
    price: 32,
    category: "brincos",
    tags: ["Brilho", "Mais vendido"],
    materials: ["banho champanhe", "micro zircônias"],
    colors: ["champanhe"],
    images: ["/products/brinco-raio-de-sol-1.jpg", fallbackProductImage],
    description: "Feixe de luz discreto, com micro zircônias que refletem.",
    details: [
      "Tamanho compacto",
      "Brilho suave para noite e dia",
      "Acabamento polido",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-04T10:00:00Z",
  },
  {
    id: "prd-colar-mare",
    name: "Colar Maré",
    slug: "colar-mare",
    price: 45,
    category: "colares",
    tags: ["Novo", "Minimal"],
    materials: ["banho champanhe", "pingente orgânico"],
    colors: ["champanhe", "areia"],
    images: ["/products/colar-mare-1.jpg", fallbackProductImage],
    description: "Corrente fluida com pingente orgânico inspirado no mar.",
    details: [
      "Pingente com textura de areia",
      "Corrente ajustável",
      "Peso leve para sobreposição",
    ],
    inStock: true,
    featured: true,
    createdAt: "2025-01-12T10:00:00Z",
  },
  {
    id: "prd-colar-horizonte",
    name: "Colar Horizonte",
    slug: "colar-horizonte",
    price: 38,
    promoPrice: 34,
    category: "colares",
    tags: ["Brilho", "Mais vendido"],
    materials: ["banho champanhe", "zircônia central"],
    colors: ["champanhe"],
    images: ["/products/colar-horizonte-1.jpg", fallbackProductImage],
    description: "Ponto de luz central com corrente fina e elegante.",
    details: [
      "Regulagem em três níveis",
      "Ponto de luz lapidado",
      "Ideal para mix com pérolas",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-11T10:00:00Z",
  },
  {
    id: "prd-colar-areia-fina",
    name: "Colar Areia Fina",
    slug: "colar-areia-fina",
    price: 29,
    category: "colares",
    tags: ["Minimal"],
    materials: ["aço hipoalergênico", "banho champanhe"],
    colors: ["areia", "champanhe"],
    images: ["/products/colar-areia-fina-1.jpg", fallbackProductImage],
    description: "Elos delicados com brilho acetinado e toque minimal.",
    details: [
      "Acabamento fosco acetinado",
      "Comprimento médio com extensor",
      "Combina com pingentes pequenos",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-09T10:00:00Z",
  },
  {
    id: "prd-colar-pingente-perola",
    name: "Colar Pingente Pérola",
    slug: "colar-pingente-perola",
    price: 47,
    promoPrice: 43,
    category: "colares",
    tags: ["Pérola", "Presenteável"],
    materials: ["pérola natural", "banho champanhe"],
    colors: ["pérola", "champanhe"],
    images: ["/products/colar-pingente-perola-1.jpg", fallbackProductImage],
    description: "Pingente de pérola única em corrente fina e elegante.",
    details: [
      "Pérola selecionada e polida",
      "Corrente fina com fecho seguro",
      "Versátil do casual ao social",
    ],
    inStock: true,
    featured: true,
    createdAt: "2025-01-07T10:00:00Z",
  },
  {
    id: "prd-colar-vento-calmo",
    name: "Colar Vento Calmo",
    slug: "colar-vento-calmo",
    price: 40,
    category: "colares",
    tags: ["Minimal"],
    materials: ["banho champanhe", "malha italiana"],
    colors: ["champanhe"],
    images: ["/products/colar-vento-calmo-1.jpg", fallbackProductImage],
    description: "Malha flexível que repousa suave na pele com brilho leve.",
    details: [
      "Malha flexível confortável",
      "Espessura fina para layering",
      "Banho com proteção antialérgica",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-05T10:00:00Z",
  },
  {
    id: "prd-pulseira-areia-fina",
    name: "Pulseira Areia Fina",
    slug: "pulseira-areia-fina",
    price: 31,
    category: "pulseiras",
    tags: ["Minimal"],
    materials: ["banho champanhe", "elos finos"],
    colors: ["areia", "champanhe"],
    images: ["/products/pulseira-areia-fina-1.jpg", fallbackProductImage],
    description: "Elos delicados que acompanham o movimento das mãos.",
    details: [
      "Extensor para ajuste fino",
      "Fecho resistente e discreto",
      "Acabamento fosco brilhante",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-03T10:00:00Z",
  },
  {
    id: "prd-pulseira-duna-suave",
    name: "Pulseira Duna Suave",
    slug: "pulseira-duna-suave",
    price: 34,
    category: "pulseiras",
    tags: ["Brilho"],
    materials: ["banho champanhe", "textura polida"],
    colors: ["champanhe"],
    images: ["/products/pulseira-duna-suave-1.jpg", fallbackProductImage],
    description: "Textura inspirada em dunas com reflexos dourados.",
    details: [
      "Textura em relevo suave",
      "Não prende em tecidos",
      "Peso leve e confortável",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-02T10:00:00Z",
  },
  {
    id: "prd-pulseira-no-marinho",
    name: "Pulseira Nó Marinho",
    slug: "pulseira-no-marinho",
    price: 27,
    category: "pulseiras",
    tags: ["Minimal"],
    materials: ["cordão acetinado", "fecho champanhe"],
    colors: ["areia", "champanhe"],
    images: ["/products/pulseira-no-marinho-1.jpg", fallbackProductImage],
    description: "Cordão acetinado com nó central e fecho dourado champanhe.",
    details: [
      "Cordão macio que não marca a pele",
      "Fecho com banho champanhe",
      "Ajustável para vários pulsos",
    ],
    inStock: true,
    featured: false,
    createdAt: "2025-01-01T10:00:00Z",
  },
  {
    id: "prd-pulseira-luz-tarde",
    name: "Pulseira Luz da Tarde",
    slug: "pulseira-luz-da-tarde",
    price: 39,
    promoPrice: 35,
    category: "pulseiras",
    tags: ["Mais vendido", "Brilho"],
    materials: ["banho champanhe", "micro esferas"],
    colors: ["champanhe"],
    images: ["/products/pulseira-luz-da-tarde-1.jpg", fallbackProductImage],
    description: "Micro esferas que refletem a luz de forma delicada.",
    details: [
      "Acabamento polido de alto brilho",
      "Estrutura flexível e resistente",
      "Ideal para compor com relógios",
    ],
    inStock: true,
    featured: true,
    createdAt: "2024-12-28T10:00:00Z",
  },
  {
    id: "prd-anel-perola-luz",
    name: "Anel Pérola Luz",
    slug: "anel-perola-luz",
    price: 33,
    category: "aneis",
    tags: ["Pérola", "Presenteável"],
    materials: ["pérola natural", "banho champanhe"],
    colors: ["pérola", "champanhe"],
    images: ["/products/anel-perola-luz-1.jpg", fallbackProductImage],
    description: "Anel de aro macio com pérola central e brilho suave.",
    details: [
      "Ajustável em meia numeração",
      "Aro arredondado para conforto",
      "Pérola selecionada com brilho acetinado",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-26T10:00:00Z",
  },
  {
    id: "prd-anel-aurora",
    name: "Anel Aurora",
    slug: "anel-aurora",
    price: 44,
    promoPrice: 40,
    category: "aneis",
    tags: ["Brilho", "Mais vendido"],
    materials: ["banho champanhe", "zircônias lapidadas"],
    colors: ["champanhe"],
    images: ["/products/anel-aurora-1.jpg", fallbackProductImage],
    description: "Fileira de luz em aro confortável com micro zircônias.",
    details: [
      "Ajuste anatômico",
      "Lapidação brilhante das pedras",
      "Banho resistente ao desgaste",
    ],
    inStock: true,
    featured: true,
    createdAt: "2024-12-24T10:00:00Z",
  },
  {
    id: "prd-anel-linha-dourada",
    name: "Anel Linha Dourada",
    slug: "anel-linha-dourada",
    price: 26,
    category: "aneis",
    tags: ["Minimal"],
    materials: ["banho champanhe"],
    colors: ["champanhe"],
    images: ["/products/anel-linha-dourada-1.jpg", fallbackProductImage],
    description: "Aro fino com linha central polida e cantos arredondados.",
    details: [
      "Perfil slim e leve",
      "Textura lisa para combinar com outros",
      "Banho champanhe com verniz protetor",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-22T10:00:00Z",
  },
  {
    id: "prd-anel-brilho-baunilha",
    name: "Anel Brilho Baunilha",
    slug: "anel-brilho-baunilha",
    price: 30,
    promoPrice: 27,
    category: "aneis",
    tags: ["Brilho", "Minimal"],
    materials: ["banho champanhe", "micro cristais"],
    colors: ["champanhe"],
    images: ["/products/anel-brilho-baunilha-1.jpg", fallbackProductImage],
    description: "Aro com micro cristais e tom baunilha aconchegante.",
    details: [
      "Cristais aplicados manualmente",
      "Aro arredondado confortável",
      "Acabamento suave que não prende",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-20T10:00:00Z",
  },
  {
    id: "prd-lenco-dourado-suave",
    name: "Lenço Dourado Suave",
    slug: "lenco-dourado-suave",
    price: 36,
    category: "lencos",
    tags: ["Presenteável"],
    materials: ["seda sintética", "acabamento acetinado"],
    colors: ["dourado champanhe", "marfim"],
    images: ["/products/lenco-dourado-suave-1.jpg", fallbackProductImage],
    description: "Lenço acetinado em tom champanhe com leve brilho.",
    details: [
      "Toque macio e geladinho",
      "Tamanho versátil para pescoço e bolsa",
      "Bainha fina e discreta",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-18T10:00:00Z",
  },
  {
    id: "prd-lenco-marfim-textura",
    name: "Lenço Marfim Textura",
    slug: "lenco-marfim-textura",
    price: 28,
    category: "lencos",
    tags: ["Minimal"],
    materials: ["voil suave", "acabamento texturizado"],
    colors: ["marfim", "areia"],
    images: ["/products/lenco-marfim-textura-1.jpg", fallbackProductImage],
    description: "Trama leve com textura de areia e caimento fluido.",
    details: [
      "Respirável para dias quentes",
      "Textura que não amassa fácil",
      "Borda levemente arredondada",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-16T10:00:00Z",
  },
  {
    id: "prd-lenco-perola-aconchego",
    name: "Lenço Pérola Aconchego",
    slug: "lenco-perola-aconchego",
    price: 32,
    category: "lencos",
    tags: ["Pérola", "Presenteável"],
    materials: ["seda sintética", "acabamento perolado"],
    colors: ["pérola", "areia"],
    images: ["/products/lenco-perola-aconchego-1.jpg", fallbackProductImage],
    description: "Efeito perolado sutil com toque macio e acolhedor.",
    details: [
      "Brilho perolado discreto",
      "Toque suave que não esquenta demais",
      "Ideal para presentear",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-14T10:00:00Z",
  },
  {
    id: "prd-kit-brilho-dia",
    name: "Kit Brilho do Dia",
    slug: "kit-brilho-do-dia",
    price: 59,
    promoPrice: 52,
    category: "kits",
    tags: ["Presenteável", "Brilho"],
    materials: ["banho champanhe", "zircônias", "pérola"],
    colors: ["champanhe", "pérola"],
    images: ["/products/kit-brilho-do-dia-1.jpg", fallbackProductImage],
    description: "Combo com brinco, colar e pulseira com brilho suave.",
    details: [
      "Três peças coordenadas",
      "Estojo em tom areia incluso",
      "Desconto especial no kit",
    ],
    inStock: true,
    featured: true,
    createdAt: "2024-12-12T10:00:00Z",
  },
  {
    id: "prd-kit-perola-essencial",
    name: "Kit Pérola Essencial",
    slug: "kit-perola-essencial",
    price: 56,
    promoPrice: 50,
    category: "kits",
    tags: ["Pérola", "Presenteável"],
    materials: ["pérolas", "banho champanhe"],
    colors: ["pérola", "champanhe"],
    images: ["/products/kit-perola-essencial-1.jpg", fallbackProductImage],
    description: "Colar curto e brinco de pérola para um look clássico.",
    details: [
      "Pérolas com brilho acetinado",
      "Fechos hipoalergênicos",
      "Estojo de viagem macio",
    ],
    inStock: true,
    featured: true,
    createdAt: "2024-12-10T10:00:00Z",
  },
  {
    id: "prd-brinco-lua-marinha",
    name: "Brinco Lua Marinha",
    slug: "brinco-lua-marinha",
    price: 35,
    category: "brincos",
    tags: ["Minimal", "Brilho"],
    materials: ["banho champanhe", "acabamento martelado"],
    colors: ["champanhe"],
    images: ["/products/brinco-lua-marinha-1.jpg", fallbackProductImage],
    description: "Formato crescente com textura martelada artesanal.",
    details: [
      "Textura que dispersa o brilho",
      "Extremidades arredondadas",
      "Fecho confortável",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-08T10:00:00Z",
  },
  {
    id: "prd-pulseira-perola-minimal",
    name: "Pulseira Pérola Minimal",
    slug: "pulseira-perola-minimal",
    price: 28,
    category: "pulseiras",
    tags: ["Pérola", "Minimal"],
    materials: ["pérolas mini", "banho champanhe"],
    colors: ["pérola", "champanhe"],
    images: ["/products/pulseira-perola-minimal-1.jpg", fallbackProductImage],
    description: "Fio de pérolas mini com fecho delicado em champanhe.",
    details: [
      "Pérolas de 3mm selecionadas",
      "Fecho com extensor",
      "Textura acetinada que não pesa",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-06T10:00:00Z",
  },
  {
    id: "prd-colar-sol-poente",
    name: "Colar Sol Poente",
    slug: "colar-sol-poente",
    price: 36,
    promoPrice: 30,
    category: "promocoes",
    tags: ["Brilho"],
    materials: ["banho champanhe", "pingente disco"],
    colors: ["champanhe"],
    images: ["/products/colar-sol-poente-1.jpg", fallbackProductImage],
    description: "Pingente disco com acabamento polido e corrente fina.",
    details: [
      "Superfície espelhada",
      "Regulagem em três alturas",
      "Peça versátil para mix",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-04T10:00:00Z",
  },
  {
    id: "prd-anel-duna-clara",
    name: "Anel Duna Clara",
    slug: "anel-duna-clara",
    price: 24,
    category: "promocoes",
    tags: ["Minimal"],
    materials: ["banho champanhe", "textura areia"],
    colors: ["champanhe", "areia"],
    images: ["/products/anel-duna-clara-1.jpg", fallbackProductImage],
    description: "Aro com textura de areia e perfil ultraleve.",
    details: [
      "Espessura fina e confortável",
      "Textura que não arranha",
      "Banho resistente",
    ],
    inStock: true,
    featured: false,
    createdAt: "2024-12-02T10:00:00Z",
  },
];

export function formatBRL(price: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(price);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

type FilterOptions = {
  category?: CategorySlug;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
};

export function filterProducts({
  category,
  q,
  minPrice,
  maxPrice,
  tags,
}: FilterOptions = {}) {
  const query = q?.trim().toLowerCase();
  const tagSet = tags?.map((tag) => tag.toLowerCase());

  return products.filter((product) => {
    if (category && product.category !== category) return false;

    if (typeof minPrice === "number" && product.price < minPrice) return false;
    if (typeof maxPrice === "number" && product.price > maxPrice) return false;

    if (tagSet?.length) {
      const productTags = product.tags.map((tag) => tag.toLowerCase());
      const hasAll = tagSet.every((tag) => productTags.includes(tag));
      if (!hasAll) return false;
    }

    if (query) {
      const haystack = [
        product.name,
        product.description,
        product.tags.join(" "),
        product.materials.join(" "),
        product.colors.join(" "),
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}
