import { ProductFormShell } from "../_components/product-form-shell";

export default function AdminNovoProdutoPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Produtos
        </p>
        <h1 className="font-display text-2xl uppercase text-foreground">
          Novo produto
        </h1>
      </div>
      <ProductFormShell />
    </div>
  );
}
