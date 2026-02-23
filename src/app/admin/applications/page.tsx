"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { APPLICATIONS, STATUS_CONFIG } from "@/data/applications";

export default function AdminApplicationsPage() {
  const [filter, setFilter] = useState("all");

  const filteredApps =
    filter === "all"
      ? APPLICATIONS
      : APPLICATIONS.filter((app) => app.status === filter);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              جميع الطلبات
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              إدارة ومراجعة جميع الأفكار والمشاريع المقدمة
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            ← العودة للوحة الإدارة
          </Link>
        </div>

        {/* فلاتر الحالة */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "submitted", "shortlisted", "pilot", "rejected"].map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                  filter === s
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--background-card)] text-[var(--foreground-muted)] border border-[var(--border)] hover:bg-[var(--beige)]"
                }`}
              >
                {s === "all"
                  ? `الكل (${APPLICATIONS.length})`
                  : `${STATUS_CONFIG[s as keyof typeof STATUS_CONFIG].label} (${APPLICATIONS.filter((a) => a.status === s).length})`}
              </button>
            )
          )}
        </div>

        {/* جدول الطلبات */}
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-card)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--beige)]">
                <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">
                  عنوان الفكرة
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">
                  البرنامج
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">
                  مرحلة المشروع
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">
                  الحالة
                </th>
                <th className="px-4 py-3 text-right font-semibold text-[var(--foreground-muted)]">
                  تاريخ التقديم
                </th>
                <th className="px-4 py-3 text-center font-semibold text-[var(--foreground-muted)]">
                  العمليات
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-12 text-center text-[var(--foreground-muted)]"
                  >
                    لا توجد طلبات بهذه الحالة
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-[var(--border)] transition hover:bg-[var(--beige)]/50 last:border-b-0"
                  >
                    <td className="px-4 py-4 font-medium text-[var(--foreground)]">
                      {app.title}
                    </td>
                    <td className="px-4 py-4 text-[var(--foreground-muted)]">
                      {app.program}
                    </td>
                    <td className="px-4 py-4 text-[var(--foreground-muted)]">
                      {app.stage}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          STATUS_CONFIG[app.status].color
                        }`}
                      >
                        {STATUS_CONFIG[app.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-[var(--foreground-muted)]">
                      {app.submittedAt}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-medium text-white transition hover:opacity-90"
                      >
                        مراجعة
                      </Link>
                    </td>
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