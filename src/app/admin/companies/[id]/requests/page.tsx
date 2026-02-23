"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getCompanyById, getRequestsByCompanyId } from "@/data/companies";

const STATUS_COLORS: Record<string, string> = {
  "مقدّم": "bg-slate-100 text-slate-800",
  "في القائمة المختصرة": "bg-amber-100 text-amber-800",
  "مرفوض": "bg-red-100 text-red-800",
  "تجريبي": "bg-emerald-100 text-emerald-800",
};

export default function CompanyRequestsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = getCompanyById(id);
  const requests = getRequestsByCompanyId(id);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              طلبات {company?.companyName ?? "الشركة"}
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              إجمالي الطلبات: {requests.length}
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/admin/companies/${id}`} className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
              ← بيانات الشركة
            </Link>
            <Link href="/admin/companies" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
              | قائمة الشركات
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige)]">
                <th className="px-4 py-3 text-right font-semibold">رقم الطلب</th>
                <th className="px-4 py-3 text-right font-semibold">عنوان الطلب</th>
                <th className="px-4 py-3 text-right font-semibold">البرنامج</th>
                <th className="px-4 py-3 text-right font-semibold">الحالة</th>
                <th className="px-4 py-3 text-right font-semibold">تاريخ التقديم</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--foreground-muted)]">
                    لا توجد طلبات لهذه الشركة
                  </td>
                </tr>
              ) : (
                requests.map((req, index) => (
                  <tr
                    key={req.id}
                    className={`border-b border-[var(--border)] hover:bg-[var(--beige)]/50 transition ${
                      index === requests.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--foreground-muted)]">{req.id}</td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{req.title}</td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{req.program}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        STATUS_COLORS[req.status] ?? "bg-slate-100 text-slate-800"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{req.submittedAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}