export type CategorySlug =
  | "brincos"
  | "colares"
  | "pulseiras"
  | "aneis"
  | "lencos"
  | "kits"
  | "promocoes";

export type Category = {
  id: string;
  name: string;
  slug: CategorySlug;
  description: string;
};

export const categories: Category[] = [
  {
    id: "cat-brincos",
    name: "Brincos",
    slug: "brincos",
    description: "Brilho leve e formatos orgânicos com banho champanhe.",
  },
  {
    id: "cat-colares",
    name: "Colares",
    slug: "colares",
    description: "Correntes delicadas, pingentes geométricos e pérolas.",
  },
  {
    id: "cat-pulseiras",
    name: "Pulseiras",
    slug: "pulseiras",
    description: "Camadas sutis para acompanhar o movimento diário.",
  },
  {
    id: "cat-aneis",
    name: "Anéis",
    slug: "aneis",
    description: "Volumes macios, conforto para uso prolongado.",
  },
  {
    id: "cat-lencos",
    name: "Lenços",
    slug: "lencos",
    description: "Tons areia e dourado suave para compor o look.",
  },
  {
    id: "cat-kits",
    name: "Kits",
    slug: "kits",
    description: "Combinações pensadas para presentear com acolhimento.",
  },
  {
    id: "cat-promocoes",
    name: "Promoções",
    slug: "promocoes",
    description: "Seleção com valores especiais por tempo limitado.",
  },
];
