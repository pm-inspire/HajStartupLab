import Link from "next/link";
import Header from "@/components/Header";
import { COMPANIES } from "@/data/companies";
import { APPLICATIONS } from "@/data/applications";
import { PROGRAMS } from "@/data/programs";

export default function AdminPage() {
  const totalApplications = APPLICATIONS.length;
  const activePrograms = PROGRAMS.filter((p) => p.status === "active").length;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            لوحة تحكم الإدارة
          </h1>
          <p className="mt-1 text-[var(--foreground-muted)]">
            إدارة الشركات والطلبات وبرامج الحاضنة
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* بطاقة الشركات */}
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
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-[var(--foreground-muted)]">
                  {COMPANIES.filter((c) => c.status === "active").length} شركة نشطة
                </p>
                <p className="text-xs text-[var(--accent)]">عرض الكل ←</p>
              </div>
            </div>
          </Link>

          {/* بطاقة الطلبات */}
          <Link href="/admin/applications">
            <div className="cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {totalApplications}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground-muted)]">
                    إجمالي الطلبات
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--beige)] text-2xl">
                  📄
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-[var(--foreground-muted)]">
                  {APPLICATIONS.filter((a) => a.status === "shortlisted").length} في القائمة المختصرة
                </p>
                <p className="text-xs text-[var(--accent)]">عرض الكل ←</p>
              </div>
            </div>
          </Link>

          {/* بطاقة البرامج */}
          <Link href="/admin/programs">
            <div className="cursor-pointer rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-[var(--foreground)]">
                    {PROGRAMS.length}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[var(--foreground-muted)]">
                    البرامج والمسارات
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--beige)] text-2xl">
                  🌟
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-[var(--foreground-muted)]">
                  {activePrograms} برنامج نشط
                </p>
                <p className="text-xs text-[var(--accent)]">عرض الكل ←</p>
              </div>
            </div>
          </Link>
        </div>

        {/* أحدث الطلبات */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">آخر الطلبات</h2>
            <Link href="/admin/applications" className="text-xs text-[var(--accent)] hover:underline">
              عرض الكل ←
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--beige)]">
                  <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">عنوان الفكرة</th>
                  <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">البرنامج</th>
                  <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">الحالة</th>
                  <th className="px-4 py-3 text-center font-semibold text-[var(--foreground-muted)]">التفاصيل</th>
                </tr>
              </thead>
              <tbody>
                {APPLICATIONS.slice(0, 3).map((app) => (
                  <tr key={app.id} className="border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--beige)]/50 transition">
                    <td className="px-4 py-3 font-medium">{app.title}</td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{app.program}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${app.statusColor}`}>
                        {app.status === "submitted" ? "مقدّم" :
                         app.status === "shortlisted" ? "في القائمة المختصرة" :
                         app.status === "pilot" ? "تجريبي" : "مرفوض"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link href={`/admin/applications/${app.id}`} className="text-xs text-[var(--accent)] hover:underline">
                        عرض
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}