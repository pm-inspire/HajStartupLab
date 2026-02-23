"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { APPLICATIONS, STATUS_CONFIG, type AppStatus } from "@/data/applications";

function getCountByStatus(status: AppStatus) {
  return APPLICATIONS.filter((app) => app.status === status).length;
}

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

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.entries(STATUS_CONFIG) as [AppStatus, (typeof STATUS_CONFIG)[AppStatus]][]).map(
            ([key, { label, color }]) => (
              <Card key={key} className="text-center">
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {getCountByStatus(key)}
                </p>
                <p className={`mt-1 rounded-full px-2 py-0.5 text-sm font-medium ${color}`}>
                  {label}
                </p>
              </Card>
            )
          )}
        </div>

        <h2 className="mb-4 text-lg font-semibold text-[var(--foreground)]">الطلبات</h2>
        <div className="space-y-6">
          {APPLICATIONS.map((app) => (
            <Card key={app.id} className="overflow-hidden transition hover:shadow-md">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border)] pb-4">
                <div>
                  <h2 className="text-lg font-semibold text-[var(--foreground)]">
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
                  className={`rounded-full px-3 py-1 text-sm font-medium ${STATUS_CONFIG[app.status].color}`}
                >
                  {STATUS_CONFIG[app.status].label}
                </span>
              </div>

              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <span className="font-medium text-[var(--foreground)]">المشكلة التي تحلها:</span>
                  <p className="mt-0.5 text-[var(--foreground-muted)] leading-relaxed">
                    {app.problem}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-[var(--foreground)]">الحل المقترح:</span>
                  <p className="mt-0.5 text-[var(--foreground-muted)] leading-relaxed">
                    {app.solution}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-[var(--foreground)]">حجم السوق:</span>
                  <p className="mt-0.5 text-[var(--foreground-muted)] leading-relaxed">
                    {app.marketSize}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div>
                    <span className="text-[var(--foreground-muted)]">مرحلة المشروع:</span>
                    <span className="me-1 font-medium text-[var(--foreground)]">
                      {app.stage === "other" && app.stageOther ? app.stageOther : app.stage}
                    </span>
                  </div>
                  <div>
                    <span className="text-[var(--foreground-muted)]">حجم الفريق:</span>
                    <span className="me-1 font-medium text-[var(--foreground)]">
                      {app.teamSize} أعضاء
                    </span>
                  </div>
                </div>
                {(app.pitchDeckName || app.demoVideoName || app.prototypeLink) && (
                  <div>
                    <span className="font-medium text-[var(--foreground)]">المرفقات:</span>
                    <ul className="mt-0.5 list-inside list-disc text-[var(--foreground-muted)]">
                      {app.pitchDeckName && <li>Pitch Deck: {app.pitchDeckName}</li>}
                      {app.demoVideoName && <li>Demo Video: {app.demoVideoName}</li>}
                      {app.prototypeLink && (
                        <li>
                          <a
                            href={app.prototypeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                          >
                            رابط النموذج
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                <div>
                  <span className="font-medium text-[var(--foreground)]">ملاحظات اللجنة:</span>
                  <p className="mt-0.5 text-[var(--foreground-muted)] leading-relaxed">
                    {app.committeeNotes ?? "لم تضف اللجنة ملاحظات بعد."}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border)]">
                <Link
                  href={`/application/${app.id}`}
                  className="text-sm font-medium text-[var(--accent)] hover:underline"
                >
                  عرض التفاصيل الكاملة ←
                </Link>
              </div>
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
