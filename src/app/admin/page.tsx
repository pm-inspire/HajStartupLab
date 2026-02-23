import Link from "next/link";
import Header from "@/components/Header";
import { COMPANIES } from "@/data/companies";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            لوحة تحكم الإدارة
          </h1>
          <p className="mt-1 text-[var(--foreground-muted)]">
            إدارة الشركات المسجلة وطلباتها
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/companies">
            <div className="cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {COMPANIES.length}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground-muted)]">
                    الشركات المسجلة
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--beige)] text-2xl">
                  🏢
                </div>
              </div>
              <p className="mt-4 text-xs text-[var(--accent)]">عرض الكل ←</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}