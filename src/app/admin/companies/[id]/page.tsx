import Link from "next/link";
import Header from "@/components/Header";
import { getCompanyById } from "@/data/companies";

export default function CompanyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const company = getCompanyById(params.id);

  if (!company) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="mx-auto max-w-2xl px-4 py-12 text-center">
          <p className="text-[var(--foreground-muted)]">لم يتم العثور على الشركة</p>
          <Link href="/admin/companies" className="mt-4 inline-block text-[var(--accent)]">← عودة</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">بيانات الشركة</h1>
          <Link href="/admin/companies" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            ← عودة للشركات
          </Link>
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">اسم الشركة</p>
              <p className="font-semibold text-[var(--foreground)]">{company.companyName}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">البريد الإلكتروني</p>
              <p className="font-semibold text-[var(--foreground)]">{company.email}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">حالة الحساب</p>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                company.status === "active"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {company.status === "active" ? "مفعّل" : "غير مفعّل"}
              </span>
            </div>
            <div>
              <p className="text-xs text-[var(--foreground-muted)] mb-1">تاريخ التسجيل</p>
              <p className="font-semibold text-[var(--foreground)]">{company.createdAt}</p>
            </div>
          </div>

          <div className="border-t border-[var(--border)] pt-4 flex gap-3">
            <Link
              href={`/admin/companies/${company.id}/requests`}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              عرض طلبات الشركة
            </Link>
            <Link
              href="/admin/companies"
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--beige)]"
            >
              عودة للقائمة
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}