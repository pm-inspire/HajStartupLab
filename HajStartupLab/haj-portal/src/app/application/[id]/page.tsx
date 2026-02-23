"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Button from "@/components/Button";

const DUMMY_DETAILS: Record<string, {
  title: string;
  program: string;
  status: string;
  statusColor: string;
  submittedAt: string;
  problem: string;
  solution: string;
  stage: string;
  teamSize: string;
}> = {
  "app-1": {
    title: "منصة تتبع الحجاج الصحية",
    program: "حاضنة الحج للصحة الرقمية",
    status: "قيد المراجعة",
    statusColor: "bg-amber-100 text-amber-800",
    submittedAt: "2025-02-20",
    problem: "صعوبة متابعة الحالة الصحية للحجاج في الوقت الفعلي وتنسيق الخدمات الطبية.",
    solution: "منصة موحدة تربط الجهات الصحية بالحجاج مع لوحة تحكم وتنبيهات.",
    stage: "نموذج أولي (MVP)",
    teamSize: "5",
  },
  "app-2": {
    title: "تطبيق توجيه الحشود",
    program: "حلول إدارة الحشود",
    status: "مقبول للمقابلة",
    statusColor: "bg-green-100 text-green-800",
    submittedAt: "2025-02-15",
    problem: "ازدحام في نقاط محددة وعدم توزيع الحشود بشكل آمن.",
    solution: "تطبيق يعتمد على تحليل البيانات والخرائط الحية لتوجيه الحجاج.",
    stage: "نمو",
    teamSize: "8",
  },
};

export default function ApplicationDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const app = DUMMY_DETAILS[id] ?? DUMMY_DETAILS["app-1"];

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
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${app.statusColor}`}
          >
            {app.status}
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="text-sm text-[var(--foreground-muted)]">
                  مرحلة المشروع
                </span>
                <p className="font-medium text-[var(--foreground)]">{app.stage}</p>
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
