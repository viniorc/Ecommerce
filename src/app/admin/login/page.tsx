import { Suspense } from "react";
import { AdminLoginClient } from "./login-client";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background">
          <div className="container flex min-h-[70vh] items-center justify-center py-12">
            <div className="h-80 w-full max-w-md animate-pulse rounded-[16px] border border-border/70 bg-card/70" />
          </div>
        </main>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
