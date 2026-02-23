import Link from "next/link";
import Header from "@/components/Header";
import { PROGRAMS, type ProgramStatus } from "@/data/programs";

const STATUS_LABELS: Record<ProgramStatus, string> = {
  active: "نشط",
  closed: "مغلق",
  upcoming: "قادم",
};

const STATUS_COLORS: Record<ProgramStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  closed: "bg-red-100 text-red-800",
  upcoming: "bg-blue-100 text-blue-800",
};

export default function AdminProgramsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              البرامج والمسارات
            </h1>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">
              جميع برامج الحاضنة والمسارات المتخصصة في قطاع الحج
            </p>
          </div>
          <Link
            href="/admin"
            className="text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
          >
            ← العودة للوحة الإدارة
          </Link>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 text-center">
            <p className="text-3xl font-bold text-[var(--foreground)]">{PROGRAMS.length}</p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">إجمالي البرامج</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 text-center">
            <p className="text-3xl font-bold text-emerald-600">{PROGRAMS.filter((p) => p.status === "active").length}</p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">برامج نشطة</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5 text-center">
            <p className="text-3xl font-bold text-[var(--foreground)]">{PROGRAMS.reduce((acc, p) => acc + p.applicationsCount, 0)}</p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">إجمالي الطلبات</p>
          </div>
        </div>

        {/* قائمة البرامج */}
        <div className="space-y-4">
          {PROGRAMS.map((program) => (
            <div
              key={program.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6 transition hover:shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-[var(--foreground)]">
                      {program.name}
                    </h2>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_COLORS[program.status]
                      }`}
                    >
                      {STATUS_LABELS[program.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                    {program.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--foreground-muted)]">
                    <span>🎯 المجال: {program.domain}</span>
                    <span>📅 الموعد النهائي: {program.deadline}</span>
                    <span>📋 عدد الطلبات: {program.applicationsCount}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="rounded-lg border border-[var(--border)] px-4 py-2 text-center">
                    <p className="text-lg font-bold text-[var(--foreground)]">
                      {program.applicationsCount}
                    </p>
                    <p className="text-xs text-[var(--foreground-muted)]">طلبات</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}