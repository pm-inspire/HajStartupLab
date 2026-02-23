"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { getApplicationById, STATUS_CONFIG } from "@/data/applications";

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const app = getApplicationById(id) ?? getApplicationById("app-1");

  if (!app) return null;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:underline"
        >
          ← العودة للوحة التحكم
        </Link>
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {app.title}
            </h1>
            <p className="mt-1 text-[var(--foreground-muted)]">{app.program}</p>
          </div>
          <span
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${STATUS_CONFIG[app.status].color}`}
          >
            {STATUS_CONFIG[app.status].label}
          </span>
        </div>
        <p className="text-sm text-[var(--foreground-muted)]">
          تاريخ التقديم: {app.submittedAt}
        </p>

        <div className="mt-8 space-y-6">
          <Card>
            <h3 className="font-semibold text-[var(--foreground)]">
              المشكلة التي تحلها
            </h3>
            <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">
              {app.problem}
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-[var(--foreground)]">
              الحل المقترح
            </h3>
            <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">
              {app.solution}
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-[var(--foreground)]">
              حجم السوق
            </h3>
            <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">
              {app.marketSize}
            </p>
          </Card>
          <Card>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-sm text-[var(--foreground-muted)]">
                  مرحلة المشروع
                </span>
                <p className="font-medium text-[var(--foreground)]">
                  {app.stage === "other" && app.stageOther ? app.stageOther : app.stage}
                </p>
              </div>
              <div>
                <span className="text-sm text-[var(--foreground-muted)]">
                  حجم الفريق
                </span>
                <p className="font-medium text-[var(--foreground)]">
                  {app.teamSize} أعضاء
                </p>
              </div>
            </div>
          </Card>
          {(app.pitchDeckName || app.demoVideoName || app.prototypeLink) && (
            <Card>
              <h3 className="font-semibold text-[var(--foreground)]">
                المرفقات
              </h3>
              <ul className="mt-3 space-y-2 text-sm">
                {app.pitchDeckName && (
                  <li className="flex items-center gap-2 text-[var(--foreground-muted)]">
                    <span className="font-medium text-[var(--foreground)]">Pitch Deck (PDF):</span>
                    {app.pitchDeckName}
                  </li>
                )}
                {app.demoVideoName && (
                  <li className="flex items-center gap-2 text-[var(--foreground-muted)]">
                    <span className="font-medium text-[var(--foreground)]">Demo Video (MP4):</span>
                    {app.demoVideoName}
                  </li>
                )}
                {app.prototypeLink && (
                  <li className="flex items-center gap-2">
                    <span className="font-medium text-[var(--foreground)]">رابط النموذج:</span>
                    <a
                      href={app.prototypeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--accent)] hover:underline"
                    >
                      {app.prototypeLink}
                    </a>
                  </li>
                )}
              </ul>
            </Card>
          )}

          <Card>
            <h3 className="font-semibold text-[var(--foreground)]">
              ملاحظات اللجنة
            </h3>
            <p className="mt-2 text-[var(--foreground-muted)] leading-relaxed">
              {app.committeeNotes ?? "لم تضف اللجنة ملاحظات بعد. ستظهر هنا الملاحظات من لوحة تحكم الإدارة بعد المراجعة."}
            </p>
          </Card>
        </div>

        <div className="mt-8">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            العودة للوحة التحكم
          </Button>
        </div>
      </main>
    </div>
  );
}
