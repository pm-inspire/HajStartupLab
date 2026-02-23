"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";

const DUMMY_APPLICATIONS = [
  {
    id: "app-1",
    title: "منصة تتبع الحجاج الصحية",
    program: "حاضنة الحج للصحة الرقمية",
    status: "قيد المراجعة",
    statusColor: "bg-amber-100 text-amber-800",
    submittedAt: "2025-02-20",
  },
  {
    id: "app-2",
    title: "تطبيق توجيه الحشود",
    program: "حلول إدارة الحشود",
    status: "مقبول للمقابلة",
    statusColor: "bg-green-100 text-green-800",
    submittedAt: "2025-02-15",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              لوحة تحكم الشركة الناشئة
            </h1>
            <p className="mt-1 text-[var(--foreground-muted)]">
              متابعة الطلبات وحالة التقديم
            </p>
          </div>
          <Link
            href="/submit-idea"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 font-medium text-white transition hover:bg-[var(--accent-hover)]"
          >
            تقديم فكرة جديدة
          </Link>
        </div>

        <div className="space-y-4">
          {DUMMY_APPLICATIONS.map((app) => (
            <Card key={app.id} className="transition hover:shadow-md">
              <Link href={`/application/${app.id}`} className="block">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-[var(--foreground)]">
                      {app.title}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                      {app.program}
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground-muted)]">
                      تاريخ التقديم: {app.submittedAt}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${app.statusColor}`}
                  >
                    {app.status}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--beige)] p-6">
          <h3 className="font-semibold text-[var(--foreground)]">خطواتك القادمة</h3>
          <ul className="mt-3 space-y-2 text-sm text-[var(--foreground-muted)]">
            <li>• متابعة حالة الطلبات من هذه الصفحة</li>
            <li>• في حال القبول، ستُحدد مواعيد المقابلات عبر البريد</li>
            <li>• يمكنك تقديم أكثر من فكرة لبرامج مختلفة</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
