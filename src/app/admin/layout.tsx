import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Sidebar } from "@/components/admin/sidebar";
import { Header } from "@/components/admin/header";

// Paksa halaman selalu render ulang
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const session = cookieStore.get("session");

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Konten */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}