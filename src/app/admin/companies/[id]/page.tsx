"use client";

import { use } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import { getCompanyById } from "@/data/companies";
import { APPLICATIONS, STATUS_CONFIG } from "@/data/applications";

export default function CompanyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const company = getCompanyById(id);

  // ربط الشركة بطلباتها بناءً على المعرف (c-1 تملك app-1 و app-4)
  const companyApps = {
    "c-1": ["app-1", "app-4"],
    "c-2": ["app-2"],
    "c-3": ["app-3"],
  } as Record<string, string[]>;

  const appIds = companyApps[id] ?? [];
  const applications = APPLICATIONS.filter((a) => appIds.includes(a.id));

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
      <main className="mx-auto max-w-3xl px-4 py-12">

        {/* زر العودة */}
        <Link
          href="/admin/companies"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          ← العودة لقائمة الشركات
        </Link>

        {/* بيانات الشركة */}
        <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{company.companyName}</h1>
              <p className="mt-1 text-[var(--foreground-muted)]">{company.email}</p>
            </div>
            <span className={`inline-block rounded-full px-3 py-1.5 text-xs font-medium ${
              company.status === "active"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-red-100 text-red-800"
            }`}>
              {company.status === "active" ? "مفعّل" : "غير مفعّل"}
            </span>
          </div>
          <p className="text-sm text-[var(--foreground-muted)]">تاريخ التسجيل: {company.createdAt}</p>
        </div>

        {/* طلبات الشركة - بنفس تصميم صفحة المستخدم */}
        <h2 className="mb-4 text-xl font-bold text-[var(--foreground)]">طلبات الشركة</h2>

        {applications.length === 0 ? (
          <p className="text-[var(--foreground-muted)]">لا توجد طلبات مسجلة لهذه الشركة.</p>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6">

                {/* عنوان + حالة */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--foreground)]">{app.title}</h3>
                    <p className="mt-1 text-[var(--foreground-muted)]">{app.program}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${STATUS_CONFIG[app.status].color}`}>
                    {STATUS_CONFIG[app.status].label}
                  </span>
                </div>

                <p className="mb-6 text-sm text-[var(--foreground-muted)]">تاريخ التقديم: {app.submittedAt}</p>

                <div className="space-y-4">
                  {/* المشكلة */}
                  <Card>
                    <h4 className="font-semibold text-[var(--foreground)]">المشكلة التي تحلها</h4>
                    <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">{app.problem}</p>
                  </Card>

                  {/* الحل */}
                  <Card>
                    <h4 className="font-semibold text-[var(--foreground)]">الحل المقترح</h4>
                    <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">{app.solution}</p>
                  </Card>

                  {/* حجم السوق */}
                  <Card>
                    <h4 className="font-semibold text-[var(--foreground)]">حجم السوق</h4>
                    <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">{app.marketSize}</p>
                  </Card>

                  {/* مرحلة + فريق */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <p className="text-sm text-[var(--foreground-muted)]">مرحلة المشروع</p>
                      <p className="mt-1 font-semibold text-[var(--foreground)]">
                        {app.stage === "other" && app.stageOther ? app.stageOther : app.stage}
                      </p>
                    </Card>
                    <Card>
                      <p className="text-sm text-[var(--foreground-muted)]">حجم الفريق</p>
                      <p className="mt-1 font-semibold text-[var(--foreground)]">{app.teamSize} أعضاء</p>
                    </Card>
                  </div>

                  {/* المرفقات */}
                  {(app.pitchDeckName || app.demoVideoName || app.prototypeLink) && (
                    <Card>
                      <h4 className="font-semibold text-[var(--foreground)]">المرفقات</h4>
                      <ul className="mt-2 space-y-1 text-sm text-[var(--foreground-muted)]">
                        {app.pitchDeckName && <li>• Pitch Deck (PDF): {app.pitchDeckName}</li>}
                        {app.demoVideoName && <li>• Demo Video (MP4): {app.demoVideoName}</li>}
                        {app.prototypeLink && (
                          <li>• رابط النموذج: <a href={app.prototypeLink} className="text-[var(--accent)] underline" target="_blank">{app.prototypeLink}</a></li>
                        )}
                      </ul>
                    </Card>
                  )}

                  {/* ملاحظات اللجنة */}
                  <Card>
                    <h4 className="font-semibold text-[var(--foreground)]">ملاحظات اللجنة</h4>
                    <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">
                      {app.committeeNotes ?? "لم تضف اللجنة ملاحظات بعد."}
                    </p>
                  </Card>
                </div>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}