import { prisma } from "@/lib/prisma";
import { BrandCard } from "@/components/brand-card";

export default async function AdminDashboardPage() {
  const [total, active, featured, outOfStock] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({
      where: { inStock: false },
    }),
  ]);

  const cards = [
    { label: "Total de produtos", value: total },
    { label: "Ativos", value: active },
    { label: "Destaques", value: featured },
    { label: "Sem estoque", value: outOfStock },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Dashboard
        </p>
        <h1 className="font-display text-2xl uppercase text-foreground">
          Bem-vindo ao admin
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <BrandCard key={card.label} className="space-y-2 p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {card.label}
            </p>
            <p className="text-2xl font-semibold text-foreground">
              {card.value}
            </p>
          </BrandCard>
        ))}
      </div>
    </div>
  );
}
