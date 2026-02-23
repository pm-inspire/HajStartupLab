"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { COMPANIES, type Company } from "@/data/companies";

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>(COMPANIES);
  const [deleteTarget, setDeleteTarget] = useState<Company | null>(null);

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setCompanies((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              الشركات المسجلة
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              إجمالي: {companies.length} شركة
            </p>
          </div>
          <Link href="/admin" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
            ← العودة للوحة الإدارة
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige)]">
                <th className="px-4 py-3 text-right font-semibold">اسم الشركة</th>
                <th className="px-4 py-3 text-right font-semibold">البريد الإلكتروني</th>
                <th className="px-4 py-3 text-right font-semibold">حالة الحساب</th>
                <th className="px-4 py-3 text-right font-semibold">تاريخ التسجيل</th>
                <th className="px-4 py-3 text-center font-semibold">العمليات</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[var(--foreground-muted)]">
                    لا توجد شركات مسجلة
                  </td>
                </tr>
              ) : (
                companies.map((company, index) => (
                  <tr
                    key={company.id}
                    className={`border-b border-[var(--border)] hover:bg-[var(--beige)]/50 transition ${
                      index === companies.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{company.companyName}</td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{company.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                        company.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {company.status === "active" ? "مفعّل" : "غير مفعّل"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--foreground-muted)]">{company.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/admin/companies/${company.id}`}
                          className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90">
                          مشاهدة
                        </Link>
                        <Link href={`/admin/companies/${company.id}/requests`}
                          className="rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-1.5 text-xs font-medium hover:bg-[var(--beige)]">
                          الطلبات
                        </Link>
                        <button onClick={() => setDeleteTarget(company)}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100">
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-2xl">
              🗑️
            </div>
            <h2 className="mb-2 text-lg font-bold text-[var(--foreground)]">تأكيد الحذف</h2>
            <p className="mb-1 text-sm text-[var(--foreground-muted)]">
              هل أنت متأكد من حذف شركة
            </p>
            <p className="mb-6 font-semibold text-[var(--foreground)]">"{deleteTarget.companyName}"?</p>
            <div className="flex gap-3">
              <button onClick={handleConfirmDelete}
                className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white hover:bg-red-700">
                تأكيد الحذف
              </button>
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-lg border border-[var(--border)] py-2 text-sm font-medium hover:bg-[var(--beige)]">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}