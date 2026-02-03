"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  GripVertical,
  ImagePlus,
  Loader2,
  Trash2,
} from "lucide-react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDropzone } from "react-dropzone";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { categories } from "@/data/categories";
import { fallbackProductImage } from "@/data/products";
import { cn } from "@/lib/utils";

const numberOptional = z.preprocess(
  (value) => {
    if (value === "" || value === null || value === undefined) return undefined;
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  },
  z.number().min(0).optional()
);

const numberRequired = z.preprocess(
  (value) => {
    const num = Number(value);
    return Number.isNaN(num) ? undefined : num;
  },
  z.number().min(0)
);

const productSchema = z
  .object({
    name: z.string().min(3, "Nome muito curto."),
    slug: z
      .string()
      .min(3, "Slug muito curto.")
      .regex(/^\S+$/, "Slug nao pode ter espacos."),
    category: z.string().min(1, "Selecione uma categoria."),
    description: z.string().min(3, "Descricao obrigatoria."),
    details: z.string().optional(),
    tags: z.string().optional(),
    materials: z.string().optional(),
    colors: z.string().optional(),
    price: numberRequired,
    promoPrice: numberOptional,
    inStock: z.boolean().default(true),
    stockQty: numberOptional,
    active: z.boolean().default(true),
    featured: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.promoPrice !== undefined && data.promoPrice >= data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["promoPrice"],
        message: "Promo deve ser menor que o preco.",
      });
    }
  });

type ProductFormValues = z.infer<typeof productSchema>;

type ImageItem = {
  id?: string;
  url: string;
  alt?: string;
  sortOrder?: number;
};

type ProductFormProps = {
  productId?: string;
  initialData?: {
    name: string;
    slug: string;
    category: string;
    description: string;
    details: string[];
    tags: string[];
    materials: string[];
    colors: string[];
    price: number;
    promoPrice?: number;
    inStock: boolean;
    stockQty?: number | null;
    active: boolean;
    featured: boolean;
    images: ImageItem[];
  };
};

const MAX_IMAGES = 8;

const toList = (value?: string) =>
  value
    ? value
        .split(/[,\\n]/)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const toString = (items?: string[]) =>
  items && items.length ? items.join(", ") : "";

const normalizeImages = (items: ImageItem[]) =>
  items.map((item, index) => ({ ...item, sortOrder: index }));

const getImageId = (image: ImageItem) => image.id ?? image.url;

type SortableImageCardProps = {
  image: ImageItem;
  index: number;
  onSetPrimary: (index: number) => void;
  onRemove: (image: ImageItem) => void;
};

function SortableImageCard({
  image,
  index,
  onSetPrimary,
  onRemove,
}: SortableImageCardProps) {
  const sortableId = getImageId(image);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortableId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <BrandCard
      ref={setNodeRef}
      style={style}
      className={cn(
        "space-y-3 p-4",
        isDragging && "cursor-grabbing opacity-80 ring-2 ring-gold/40"
      )}
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-pearl/70 px-3 py-1 text-xs text-muted-foreground transition hover:border-gold/40 hover:text-foreground"
          aria-label="Arrastar para reordenar"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3.5 w-3.5" />
          Arrastar
        </button>
        {index === 0 ? (
          <Badge
            variant="outline"
            className="border-gold/40 text-[0.65rem] uppercase tracking-[0.2em] text-gold"
          >
            Principal
          </Badge>
        ) : null}
      </div>
      <div className="h-40 overflow-hidden rounded-[12px] border border-border/70 bg-pearl/80">
        <Image
          src={image.url || fallbackProductImage}
          alt={image.alt ?? "Preview do produto"}
          width={320}
          height={240}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <BrandButton
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onSetPrimary(index)}
          disabled={index === 0}
        >
          Definir como principal
        </BrandButton>
        <BrandButton
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onRemove(image)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </BrandButton>
      </div>
    </BrandCard>
  );
}

export function ProductForm({ productId, initialData }: ProductFormProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [images, setImages] = useState<ImageItem[]>(
    normalizeImages(initialData?.images ?? [])
  );
  const [uploading, setUploading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<ImageItem | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      slug: initialData?.slug ?? "",
      category: initialData?.category ?? "",
      description: initialData?.description ?? "",
      details: toString(initialData?.details),
      tags: toString(initialData?.tags),
      materials: toString(initialData?.materials),
      colors: toString(initialData?.colors),
      price: initialData?.price ?? 0,
      promoPrice: initialData?.promoPrice ?? undefined,
      inStock: initialData?.inStock ?? true,
      stockQty: initialData?.stockQty ?? undefined,
      active: initialData?.active ?? true,
      featured: initialData?.featured ?? false,
    },
  });

  const slotsLeft = Math.max(0, MAX_IMAGES - images.length);

  const persistImages = async (nextImages: ImageItem[]) => {
    if (!productId) return;
    setSyncing(true);
    setSyncMessage(null);
    setSyncError(null);
    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imagesOnly: true,
        images: nextImages.map((img, index) => ({
          url: img.url,
          alt: img.alt ?? form.getValues("name"),
          sortOrder: index,
        })),
      }),
    });
    setSyncing(false);
    if (!response.ok) {
      setSyncError("Nao foi possivel salvar as fotos. Tente novamente.");
      return;
    }
    setSyncMessage("Fotos salvas com sucesso.");
  };

  const commitImages = async (
    nextImages: ImageItem[],
    options?: { persist?: boolean }
  ) => {
    const normalized = normalizeImages(nextImages);
    setImages(normalized);
    if (options?.persist) {
      await persistImages(normalized);
    }
  };

  const handleDrop = async (acceptedFiles: File[]) => {
    if (!acceptedFiles.length || slotsLeft <= 0) return;
    const files = acceptedFiles.slice(0, slotsLeft);
    setUploading(true);
    const uploads: ImageItem[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) continue;
      const data = await response.json();
      uploads.push({ url: data.url, alt: form.getValues("name") });
    }

    setUploading(false);

    if (uploads.length) {
      await commitImages([...images, ...uploads], { persist: Boolean(productId) });
    }
  };

  const handleRemoveImage = async () => {
    if (!removeTarget) return;
    await fetch("/api/admin/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: removeTarget.url }),
    });
    const nextImages = images.filter((img) => img.url !== removeTarget.url);
    setRemoveTarget(null);
    await commitImages(nextImages, { persist: Boolean(productId) });
  };

  const handleSetPrimary = async (index: number) => {
    if (index === 0) return;
    const nextImages = arrayMove(images, index, 0);
    await commitImages(nextImages, { persist: Boolean(productId) });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const sortableIds = useMemo(() => images.map(getImageId), [images]);

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!event.over) return;
    if (event.active.id === event.over.id) return;
    const oldIndex = images.findIndex((img) => getImageId(img) === event.active.id);
    const newIndex = images.findIndex((img) => getImageId(img) === event.over?.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const nextImages = arrayMove(images, oldIndex, newIndex);
    await commitImages(nextImages, { persist: Boolean(productId) });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: handleDrop,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    disabled: uploading || slotsLeft <= 0,
  });

  const rejectionMessage = fileRejections.length
    ? "Alguns arquivos foram ignorados. Use JPG, PNG ou WEBP."
    : null;

  const handleSubmit = async (values: ProductFormValues) => {
    setIsSaving(true);
    const orderedImages = normalizeImages(images);
    const payload = {
      ...values,
      details: toList(values.details),
      tags: toList(values.tags),
      materials: toList(values.materials),
      colors: toList(values.colors),
      images: orderedImages.map((img, index) => ({
        ...img,
        sortOrder: index,
      })),
    };

    const endpoint = productId
      ? `/api/admin/products/${productId}`
      : "/api/admin/products";
    const method = productId ? "PATCH" : "POST";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setIsSaving(false);

    if (response.ok) {
      router.push("/admin/produtos");
      return;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BrandCard className="space-y-6 p-6">
          <Tabs defaultValue="basico" className="space-y-6">
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="basico">Basico</TabsTrigger>
              <TabsTrigger value="conteudo">Conteudo</TabsTrigger>
              <TabsTrigger value="preco">Preco/Estoque</TabsTrigger>
              <TabsTrigger value="fotos">Fotos</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
            </TabsList>

            <TabsContent value="basico" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Nome do produto" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="slug-sem-espacos" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.slug} value={cat.slug}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags (separe por virgula)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Novo, Brilho, Minimal" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="conteudo" className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descricao</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Descricao curta" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalhes (uma linha por item)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} placeholder="Banho champanhe..." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="materials"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materiais</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Banho champanhe, perola" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cores</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Champanhe, areia" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </TabsContent>

            <TabsContent value="preco" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preco (BRL)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="promoPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo (opcional)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" step="0.01" min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stockQty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" min={0} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-[12px] border border-border/70 p-4">
                    <div>
                      <FormLabel>Disponivel</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Desmarque para indicar produto sem estoque.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>

            <TabsContent value="fotos" className="space-y-4">
              <div className="grid gap-3">
                <div
                  {...getRootProps()}
                  className={cn(
                    "flex flex-col gap-3 rounded-[16px] border border-dashed border-border/70 bg-card/70 p-5 text-sm text-muted-foreground transition",
                    isDragActive && "border-gold/50 bg-pearl/90 text-foreground",
                    slotsLeft <= 0 && "cursor-not-allowed opacity-60"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-pearl/80 text-foreground">
                      <ImagePlus className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {slotsLeft > 0
                          ? "Arraste e solte as fotos aqui"
                          : "Limite de fotos atingido"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG ou WEBP. Ate 3MB. {slotsLeft} de {MAX_IMAGES} disponiveis.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {productId ? (
                      <BrandButton
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => persistImages(images)}
                        disabled={syncing || !images.length}
                      >
                        Sincronizar fotos
                      </BrandButton>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Salve o produto para sincronizar as fotos.
                      </span>
                    )}
                  </div>
                  {uploading ? (
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando fotos...
                    </span>
                  ) : null}
                  {syncing ? (
                    <span className="text-xs text-muted-foreground">
                      Salvando ordem das fotos...
                    </span>
                  ) : null}
                  {syncMessage ? (
                    <span className="text-xs text-gold">{syncMessage}</span>
                  ) : null}
                  {syncError ? (
                    <span className="text-xs text-red-600">{syncError}</span>
                  ) : null}
                  {rejectionMessage ? (
                    <span className="text-xs text-muted-foreground">
                      {rejectionMessage}
                    </span>
                  ) : null}
                </div>

                {images.length ? (
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={sortableIds} strategy={rectSortingStrategy}>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {images.map((image, index) => (
                          <SortableImageCard
                            key={getImageId(image)}
                            image={image}
                            index={index}
                            onSetPrimary={handleSetPrimary}
                            onRemove={(img) => setRemoveTarget(img)}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                ) : (
                  <BrandCard className="flex flex-col items-center gap-3 p-6 text-center">
                    <div className="h-32 w-full max-w-[280px] overflow-hidden rounded-[12px] border border-border/70 bg-pearl/80">
                      <Image
                        src={fallbackProductImage}
                        alt="Sem fotos"
                        width={320}
                        height={240}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Nenhuma foto adicionada</p>
                      <p className="text-xs text-muted-foreground">
                        Envie ate {MAX_IMAGES} imagens e defina a principal.
                      </p>
                    </div>
                  </BrandCard>
                )}
              </div>

              <Dialog
                open={Boolean(removeTarget)}
                onOpenChange={(open) => {
                  if (!open) {
                    setRemoveTarget(null);
                  }
                }}
              >
                <DialogContent className="border-border/70 bg-card">
                  <DialogHeader>
                    <DialogTitle>Remover foto</DialogTitle>
                    <DialogDescription>
                      Esta acao remove a imagem do produto e do armazenamento local.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <BrandButton
                      type="button"
                      variant="outline"
                      onClick={() => setRemoveTarget(null)}
                    >
                      Cancelar
                    </BrandButton>
                    <BrandButton type="button" onClick={handleRemoveImage}>
                      Remover
                    </BrandButton>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-[12px] border border-border/70 p-4">
                    <div>
                      <FormLabel>Ativo</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Produtos inativos nao aparecem na loja.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-[12px] border border-border/70 p-4">
                    <div>
                      <FormLabel>Destaque</FormLabel>
                      <p className="text-xs text-muted-foreground">
                        Aparece em selecoes principais e recomendados.
                      </p>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </TabsContent>
          </Tabs>
        </BrandCard>

        <div className="flex items-center justify-end gap-3">
          <BrandButton
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/produtos")}
          >
            Cancelar
          </BrandButton>
          <BrandButton type="submit" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Salvar produto"}
          </BrandButton>
        </div>
      </form>
    </Form>
  );
}
