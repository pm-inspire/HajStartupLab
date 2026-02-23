"use client";

import { use, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { getApplicationById, STATUS_CONFIG, type AppStatus } from "@/data/applications";

export default function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const appData = getApplicationById(id);

  const [status, setStatus] = useState<AppStatus>(appData?.status ?? "submitted");
  const [notes, setNotes] = useState(appData?.committeeNotes ?? "");
  const [saved, setSaved] = useState(false);

  if (!appData) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-12 text-center">
          <p className="text-[var(--foreground-muted)]">لم يتم العثور على الطلب</p>
          <Link href="/admin/applications" className="mt-4 inline-block text-sm text-[var(--accent)]">← عودة</Link>
        </main>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentStatusConfig = STATUS_CONFIG[status];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* زر العودة */}
        <Link
          href="/admin/applications"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          ← عودة لقائمة الطلبات
        </Link>

        {/* رأس الصفحة */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{appData.title}</h1>
            <p className="mt-1 text-[var(--foreground-muted)]">{appData.program}</p>
            <p className="mt-1 text-sm text-[var(--foreground-muted)]">تاريخ التقديم: {appData.submittedAt}</p>
          </div>
          <span
            className={`inline-flex h-fit items-center rounded-full px-3 py-1 text-sm font-medium ${
              currentStatusConfig.color
            }`}
          >
            {currentStatusConfig.label}
          </span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* العمود الرئيسي */}
          <div className="space-y-4 lg:col-span-2">
            {/* المشكلة */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--foreground-muted)]">المشكلة التي تحلها</h3>
              <p className="text-[var(--foreground)]">{appData.problem}</p>
            </div>

            {/* الحل */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--foreground-muted)]">الحل المقترح</h3>
              <p className="text-[var(--foreground)]">{appData.solution}</p>
            </div>

            {/* حجم السوق */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-2 text-sm font-semibold text-[var(--foreground-muted)]">حجم السوق</h3>
              <p className="text-[var(--foreground)]">{appData.marketSize}</p>
            </div>

            {/* المرفقات */}
            {(appData.pitchDeckName || appData.demoVideoName || appData.prototypeLink) && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
                <h3 className="mb-3 text-sm font-semibold text-[var(--foreground-muted)]">المرفقات</h3>
                <ul className="space-y-2">
                  {appData.pitchDeckName && (
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-lg">📄</span>
                      <span>{appData.pitchDeckName}</span>
                    </li>
                  )}
                  {appData.demoVideoName && (
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-lg">🎥</span>
                      <span>{appData.demoVideoName}</span>
                    </li>
                  )}
                  {appData.prototypeLink && (
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-lg">🔗</span>
                      <a href={appData.prototypeLink} target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">رابط النموذج</a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* العمود الجانبي */}
          <div className="space-y-4">
            {/* بيانات سريعة */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-3 text-sm font-semibold text-[var(--foreground-muted)]">بيانات المشروع</h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-[var(--foreground-muted)]">مرحلة المشروع</dt>
                  <dd className="font-medium">{appData.stage}</dd>
                </div>
                <div>
                  <dt className="text-[var(--foreground-muted)]">حجم الفريق</dt>
                  <dd className="font-medium">{appData.teamSize} أعضاء</dd>
                </div>
              </dl>
            </div>

            {/* تغيير الحالة */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-3 text-sm font-semibold text-[var(--foreground-muted)]">تحديث الحالة</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AppStatus)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>

            {/* ملاحظات اللجنة */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
              <h3 className="mb-3 text-sm font-semibold text-[var(--foreground-muted)]">ملاحظات اللجنة</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder="أضف ملاحظات اللجنة هنا..."
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)] resize-none"
              />
              <button
                onClick={handleSave}
                className="mt-3 w-full rounded-lg bg-[var(--accent)] py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                {saved ? "✓ تم الحفظ" : "حفظ التغييرات"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}