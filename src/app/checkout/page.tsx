"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  CreditCard,
  MapPin,
  PackageCheck,
  User,
  Wallet,
} from "lucide-react";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/section";
import { useCartStore } from "@/store/cart";
import { formatBRL } from "@/data/products";
import { cn } from "@/lib/utils";

type StepKey = "dados" | "entrega" | "pagamento";

type Customer = {
  name: string;
  email: string;
  phone: string;
};

type Address = {
  postalCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
};

type PaymentMethod = "pix" | "card";

type Order = {
  id: string;
  items: ReturnType<typeof useCartStore.getState>["items"];
  totals: { subtotal: number; discount: number; total: number };
  customer: Customer;
  address: Address;
  paymentMethod: PaymentMethod;
  createdAt: string;
};

const steps: Array<{ key: StepKey; label: string; icon: typeof User }> = [
  { key: "dados", label: "Dados", icon: User },
  { key: "entrega", label: "Entrega", icon: MapPin },
  { key: "pagamento", label: "Pagamento", icon: CreditCard },
];

const createOrderId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `LIA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  }
  return `LIA-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const totals = useCartStore((state) => state.totals);
  const clear = useCartStore((state) => state.clear);
  const totalsValue = totals();

  const [stepIndex, setStepIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [customer, setCustomer] = useState<Customer>({
    name: "",
    email: "",
    phone: "",
  });
  const [address, setAddress] = useState<Address>({
    postalCode: "",
    street: "",
    number: "",
    district: "",
    city: "",
    state: "",
    complement: "",
  });

  const currentStep = steps[stepIndex]?.key ?? "dados";

  const orderSummary = useMemo(
    () => ({
      subtotal: totalsValue.subtotal,
      discount: totalsValue.discount,
      total: totalsValue.total,
    }),
    [totalsValue]
  );

  const validateStep = (step: StepKey) => {
    const nextErrors: Record<string, string> = {};

    if (step === "dados") {
      if (!customer.name.trim()) nextErrors.name = "Informe seu nome.";
      if (!customer.email.trim() || !customer.email.includes("@")) {
        nextErrors.email = "Email inválido.";
      }
      if (!customer.phone.trim() || customer.phone.replace(/\D/g, "").length < 10) {
        nextErrors.phone = "Telefone inválido.";
      }
    }

    if (step === "entrega") {
      if (address.postalCode.replace(/\D/g, "").length !== 8) {
        nextErrors.postalCode = "CEP inválido.";
      }
      if (!address.street.trim()) nextErrors.street = "Rua é obrigatória.";
      if (!address.number.trim()) nextErrors.number = "Número é obrigatório.";
      if (!address.district.trim()) nextErrors.district = "Bairro é obrigatório.";
      if (!address.city.trim()) nextErrors.city = "Cidade é obrigatória.";
      if (!address.state.trim()) nextErrors.state = "UF é obrigatória.";
    }

    if (step === "pagamento") {
      if (!paymentMethod) nextErrors.paymentMethod = "Escolha uma forma de pagamento.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    const stepKey = steps[stepIndex]?.key ?? "dados";
    if (!validateStep(stepKey)) return;
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handlePlaceOrder = () => {
    if (!validateStep("pagamento")) return;
    if (!items.length) return;

    const order: Order = {
      id: createOrderId(),
      items,
      totals: orderSummary,
      customer,
      address,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("liahna-order", JSON.stringify(order));
    localStorage.setItem("liahna-last-order-id", order.id);
    clear();
    router.push(`/pedido/sucesso?orderId=${order.id}`);
  };

  const SummaryContent = (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-display text-xl uppercase text-foreground">Resumo</h3>
        <p className="text-sm text-muted-foreground">
          {items.length} item{items.length === 1 ? "" : "s"} no seu pedido.
        </p>
      </div>

      <div className="space-y-3 text-sm text-foreground">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>{formatBRL(orderSummary.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-gold">
          <span>Descontos</span>
          <span>- {formatBRL(orderSummary.discount)}</span>
        </div>
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>{formatBRL(orderSummary.total)}</span>
        </div>
      </div>

      <div className="rounded-[12px] border border-dashed border-border/60 bg-pearl/80 p-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 text-foreground">
          <PackageCheck className="h-4 w-4 text-gold" />
          Entrega estimada em 2-6 dias úteis.
        </div>
        <p className="mt-2">
          Confirmação por WhatsApp assim que o pedido for enviado.
        </p>
      </div>

      {items.length === 0 ? (
        <BrandButton asChild variant="outline" className="w-full">
          <Link href="/produtos">Voltar ao catálogo</Link>
        </BrandButton>
      ) : null}
    </div>
  );

  return (
    <main className="bg-background">
      <Section
        eyebrow="Pagamento"
        title="Checkout"
        description="Finalize com calma: dados, entrega e pagamento em três passos."
        className="pt-10 md:pt-14"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <BrandCard className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === stepIndex;
                  const isCompleted = index < stepIndex;
                  return (
                    <div
                      key={step.key}
                      className={cn(
                        "flex items-center gap-3 rounded-[14px] border px-4 py-3 text-sm transition",
                        isActive && "border-gold bg-pearl text-foreground",
                        isCompleted && "border-emerald-200 bg-emerald-50 text-emerald-700"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-semibold uppercase tracking-[0.14em]">
                        {step.label}
                      </span>
                      {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : null}
                    </div>
                  );
                })}
              </div>

              {currentStep === "dados" ? (
                <div className="space-y-4">
                  <h2 className="font-display text-lg uppercase text-foreground">
                    Seus dados
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-name"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Nome
                      </label>
                      <Input
                        id="checkout-name"
                        value={customer.name}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Seu nome completo"
                      />
                      {errors.name ? (
                        <p className="text-xs text-red-600">{errors.name}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-email"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="checkout-email"
                        type="email"
                        value={customer.email}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="voce@email.com"
                      />
                      {errors.email ? (
                        <p className="text-xs text-red-600">{errors.email}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-phone"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Telefone
                      </label>
                      <Input
                        id="checkout-phone"
                        value={customer.phone}
                        onChange={(e) =>
                          setCustomer((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        placeholder="(11) 99999-0000"
                      />
                      {errors.phone ? (
                        <p className="text-xs text-red-600">{errors.phone}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {currentStep === "entrega" ? (
                <div className="space-y-4">
                  <h2 className="font-display text-lg uppercase text-foreground">
                    Endereço de entrega
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-postal"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        CEP
                      </label>
                      <Input
                        id="checkout-postal"
                        value={address.postalCode}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            postalCode: e.target.value,
                          }))
                        }
                        placeholder="00000-000"
                      />
                      {errors.postalCode ? (
                        <p className="text-xs text-red-600">{errors.postalCode}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-street"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Rua
                      </label>
                      <Input
                        id="checkout-street"
                        value={address.street}
                        onChange={(e) =>
                          setAddress((prev) => ({ ...prev, street: e.target.value }))
                        }
                        placeholder="Rua das Pérolas"
                      />
                      {errors.street ? (
                        <p className="text-xs text-red-600">{errors.street}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-number"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Número
                      </label>
                      <Input
                        id="checkout-number"
                        value={address.number}
                        onChange={(e) =>
                          setAddress((prev) => ({ ...prev, number: e.target.value }))
                        }
                        placeholder="123"
                      />
                      {errors.number ? (
                        <p className="text-xs text-red-600">{errors.number}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-district"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Bairro
                      </label>
                      <Input
                        id="checkout-district"
                        value={address.district}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            district: e.target.value,
                          }))
                        }
                        placeholder="Centro"
                      />
                      {errors.district ? (
                        <p className="text-xs text-red-600">{errors.district}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-city"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Cidade
                      </label>
                      <Input
                        id="checkout-city"
                        value={address.city}
                        onChange={(e) =>
                          setAddress((prev) => ({ ...prev, city: e.target.value }))
                        }
                        placeholder="São Paulo"
                      />
                      {errors.city ? (
                        <p className="text-xs text-red-600">{errors.city}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="checkout-state"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        UF
                      </label>
                      <Input
                        id="checkout-state"
                        value={address.state}
                        onChange={(e) =>
                          setAddress((prev) => ({ ...prev, state: e.target.value }))
                        }
                        placeholder="SP"
                        maxLength={2}
                      />
                      {errors.state ? (
                        <p className="text-xs text-red-600">{errors.state}</p>
                      ) : null}
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label
                        htmlFor="checkout-complement"
                        className="text-xs uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        Complemento (opcional)
                      </label>
                      <Input
                        id="checkout-complement"
                        value={address.complement}
                        onChange={(e) =>
                          setAddress((prev) => ({
                            ...prev,
                            complement: e.target.value,
                          }))
                        }
                        placeholder="Apto, bloco, referência"
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              {currentStep === "pagamento" ? (
                <div className="space-y-4">
                  <h2 className="font-display text-lg uppercase text-foreground">
                    Pagamento
                  </h2>
                  <div className="grid gap-3 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pix")}
                      className={cn(
                        "flex items-center justify-between rounded-[14px] border px-4 py-4 text-sm transition",
                        paymentMethod === "pix"
                          ? "border-gold bg-pearl text-foreground"
                          : "border-border/70 text-muted-foreground hover:border-gold"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-gold" />
                        <div>
                          <p className="font-semibold uppercase tracking-[0.14em]">
                            Pix
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Aprovação imediata
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "pix" ? (
                        <CheckCircle2 className="h-5 w-5 text-gold" />
                      ) : null}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={cn(
                        "flex items-center justify-between rounded-[14px] border px-4 py-4 text-sm transition",
                        paymentMethod === "card"
                          ? "border-gold bg-pearl text-foreground"
                          : "border-border/70 text-muted-foreground hover:border-gold"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-gold" />
                        <div>
                          <p className="font-semibold uppercase tracking-[0.14em]">
                            Cartão
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Até 6x sem juros
                          </p>
                        </div>
                      </div>
                      {paymentMethod === "card" ? (
                        <CheckCircle2 className="h-5 w-5 text-gold" />
                      ) : null}
                    </button>
                  </div>
                  {errors.paymentMethod ? (
                    <p className="text-xs text-red-600">{errors.paymentMethod}</p>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap items-center justify-between gap-3">
                <BrandButton
                  variant="outline"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                >
                  Voltar
                </BrandButton>
                {stepIndex < steps.length - 1 ? (
                  <BrandButton onClick={handleNext}>Continuar</BrandButton>
                ) : (
                  <BrandButton onClick={handlePlaceOrder} disabled={!items.length}>
                    Concluir pedido
                  </BrandButton>
                )}
              </div>
            </BrandCard>

            <details className="rounded-[16px] border border-border/70 bg-card/80 p-4 lg:hidden">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
                Resumo do pedido
              </summary>
              <div className="mt-4">{SummaryContent}</div>
            </details>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BrandCard>{SummaryContent}</BrandCard>
            </div>
          </aside>
        </div>
      </Section>
    </main>
  );
}
