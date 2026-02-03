"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BrandButton } from "@/components/brand-button";
import { BrandCard } from "@/components/brand-card";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  username: z.string().min(1, "Informe o usuario."),
  password: z.string().min(1, "Informe a senha."),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/admin";
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setAuthError(null);
    const result = await signIn("credentials", {
      redirect: false,
      username: values.username,
      password: values.password,
      callbackUrl,
    });

    if (result?.error) {
      setAuthError("Credenciais invalidas.");
      return;
    }

    router.push(callbackUrl);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container flex min-h-[70vh] items-center justify-center py-12">
        <BrandCard className="w-full max-w-md space-y-6 p-8">
          <div className="space-y-2 text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Admin
            </p>
            <h1 className="font-display text-2xl uppercase text-foreground">
              Entrar
            </h1>
            <p className="text-sm text-muted-foreground">
              Use as credenciais configuradas em <code>ADMIN_USER</code>.
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Usuario
              </label>
              <Input {...form.register("username")} placeholder="admin" />
              {form.formState.errors.username ? (
                <p className="text-xs text-red-600">
                  {form.formState.errors.username.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Senha
              </label>
              <Input
                type="password"
                {...form.register("password")}
                placeholder="********"
              />
              {form.formState.errors.password ? (
                <p className="text-xs text-red-600">
                  {form.formState.errors.password.message}
                </p>
              ) : null}
            </div>
            {authError ? (
              <p className="text-sm text-red-600">{authError}</p>
            ) : null}
            <BrandButton type="submit" className="w-full">
              Entrar
            </BrandButton>
          </form>
        </BrandCard>
      </div>
    </main>
  );
}
