import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata: Metadata = {
  title: "Admin | Liahna",
  description: "Area administrativa da Liahna.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container py-10">{children}</main>
    </div>
  );
}
