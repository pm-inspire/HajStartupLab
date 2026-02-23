"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

const PROGRAMS = [
  { id: "incubator-1", name: "حاضنة الحج للصحة الرقمية" },
  { id: "incubator-2", name: "برنامج الابتكار في التنقل" },
  { id: "incubator-3", name: "حلول إدارة الحشود" },
];

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    programId: "",
    title: "",
    problem: "",
    solution: "",
    stage: "",
    teamSize: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            تقديم الفكرة
          </h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            اختر البرنامج وصف فكرتك بشكل واضح.
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                البرنامج / الحاضنة
              </label>
              <select
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                value={form.programId}
                onChange={(e) => setForm({ ...form, programId: e.target.value })}
                required
              >
                <option value="">اختر البرنامج</option>
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="عنوان الفكرة"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="مثال: منصة تتبع الحجاج الصحية"
              required
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                المشكلة التي تحلها
              </label>
              <textarea
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                rows={4}
                value={form.problem}
                onChange={(e) => setForm({ ...form, problem: e.target.value })}
                placeholder="وصف المشكلة في منظومة الحج..."
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                الحل المقترح
              </label>
              <textarea
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                rows={4}
                value={form.solution}
                onChange={(e) => setForm({ ...form, solution: e.target.value })}
                placeholder="كيف تحل شركتك هذه المشكلة؟"
                required
              />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                  مرحلة المشروع
                </label>
                <select
                  className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2.5 text-[var(--foreground)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value })}
                >
                  <option value="">اختر</option>
                  <option value="idea">فكرة</option>
                  <option value="mvp">نموذج أولي (MVP)</option>
                  <option value="growth">نمو</option>
                </select>
              </div>
              <Input
                label="حجم الفريق (تقريبي)"
                value={form.teamSize}
                onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                placeholder="مثال: 5"
              />
            </div>
            <Button type="submit" className="w-full">
              إرسال الطلب
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
