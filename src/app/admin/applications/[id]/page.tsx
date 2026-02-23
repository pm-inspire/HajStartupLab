"use client";

import { use, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { 
  getApplicationById, 
  STATUS_CONFIG, 
  DECISION_CONFIG,
  DEFAULT_CRITERIA,
  type AppStatus,
  type EvaluationDecision
} from "@/data/applications";

export default function AdminApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const appData = getApplicationById(id);

  const [activeTab, setActiveTab] = useState<"info" | "eval" | "activity">("info");
  const [evalSubTab, setEvalSubTab] = useState<"reviewer" | "admin" | "final">("reviewer");

  const [status, setStatus] = useState<AppStatus>(appData?.status ?? "submitted");
  const [notes, setNotes] = useState(appData?.committeeNotes ?? "");
  const [saved, setSaved] = useState(false);

  const [blindReview, setBlindReview] = useState(appData?.evaluation?.blindReview ?? false);
  const [decision, setDecision] = useState<EvaluationDecision>(appData?.evaluation?.finalDecision ?? "pending");
  const [officialComment, setOfficialComment] = useState(appData?.evaluation?.officialComment ?? "");

  if (!appData) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Header />
        <main className="mx-auto max-w-4xl px-4 py-12 text-center">
          <p className="text-[var(--foreground-muted)]">لم يتم العثور على الطلب</p>
          <Link href="/admin/applications" className="mt-4 inline-block text-sm text-[var(--accent)]">
            ← عودة
          </Link>
        </main>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentStatusConfig = STATUS_CONFIG[status];
  const currentDecisionConfig = DECISION_CONFIG[decision];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link 
          href="/admin/applications" 
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
        >
          ← عودة لقائمة الطلبات
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{appData.title}</h1>
            <p className="mt-1 text-[var(--foreground-muted)]">{appData.program}</p>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--foreground-muted)]">
              <span>تاريخ التقديم: {appData.submittedAt}</span>
              <span>المسار: ابتكار صحي</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${currentStatusConfig.color}`}>
              {currentStatusConfig.label}
            </span>
            {decision !== "pending" && (
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${currentDecisionConfig.color}`}>
                القرار: {currentDecisionConfig.label}
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 border-b border-[var(--border)]">
          <nav className="-mb-px flex gap-8">
            {[
              { id: "info", label: "معلومات الطلب" },
              { id: "eval", label: "التقييم واللجان" },
              { id: "activity", label: "سجل النشاط" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                  ? "border-b-2 border-[var(--accent)] text-[var(--accent)]" 
                  : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {activeTab === "info" && (
              <div className="space-y-6">
                <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-[var(--foreground)]">المشكلة التي تحلها</h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">{appData.problem}</p>
                </section>
                <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-[var(--foreground)]">الحل المقترح</h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">{appData.solution}</p>
                </section>
                <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-[var(--foreground)]">حجم السوق</h3>
                  <p className="text-sm leading-relaxed text-[var(--foreground-muted)]">{appData.marketSize}</p>
                </section>
              </div>
            )}

            {activeTab === "eval" && (
              <div className="space-y-6">
                <div className="flex gap-4 mb-6">
                  {[
                    { id: "reviewer", label: "تقييمي الشخصي" },
                    { id: "admin", label: "تفاصيل التقييمات (للإدارة)" },
                    { id: "final", label: "قرار اللجنة النهائي" }
                  ].map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => setEvalSubTab(sub.id as any)}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                        evalSubTab === sub.id 
                        ? "bg-[var(--accent)] text-white" 
                        : "bg-[var(--border)] text-[var(--foreground-muted)] hover:bg-[var(--foreground-muted)] hover:text-white"
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>

                {evalSubTab === "reviewer" && (
                  <div className="space-y-6">
                    {blindReview && (
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-700 text-sm flex gap-2 items-center">
                        ℹ️ هذا الطلب يُقيَّم بنظام المراجعة العمياء. تم إخفاء بيانات الهوية.
                      </div>
                    )}
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
                      <table className="w-full text-right text-sm">
                        <thead className="bg-[var(--border)] text-[var(--foreground)]">
                          <tr>
                            <th className="p-4 font-bold">المعيار</th>
                            <th className="p-4 font-bold">الوزن</th>
                            <th className="p-4 font-bold">الدرجة (1-5)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--border)] text-[var(--foreground-muted)]">
                          {DEFAULT_CRITERIA.map(c => (
                            <tr key={c.id}>
                              <td className="p-4">
                                <div className="font-medium text-[var(--foreground)]">{c.name}</div>
                                <div className="text-xs">{c.description}</div>
                              </td>
                              <td className="p-4">{c.weight}%</td>
                              <td className="p-4">
                                <select className="w-20 rounded border border-[var(--border)] bg-transparent p-1">
                                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {evalSubTab === "admin" && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-dashed border-[var(--accent)] p-6 bg-[var(--accent)]/5">
                      <h4 className="font-bold text-[var(--accent)] mb-4 flex items-center gap-2">⚙️ إعدادات المشرف لهذا الطلب</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">نظام المراجعة العمياء (Blind Review)</label>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => setBlindReview(!blindReview)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${blindReview ? 'bg-[var(--accent)]' : 'bg-slate-300'}`}
                            >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${blindReview ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                            <span className="text-sm">{blindReview ? 'مفعّل' : 'معطّل'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {evalSubTab === "final" && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-6">
                      <div className="space-y-4">
                        <label className="block text-sm font-bold">القرار النهائي للجنة</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {Object.entries(DECISION_CONFIG).map(([key, val]) => (
                            <button
                              key={key}
                              onClick={() => setDecision(key as any)}
                              className={`p-3 text-xs font-bold rounded-xl border transition ${
                                decision === key 
                                ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" 
                                : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                              }`}
                            >
                              {val.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={handleSave} className="w-full bg-[var(--accent)] text-white py-3 rounded-xl font-bold hover:opacity-90">
                        {saved ? "✓ تم اعتماد القرار" : "اعتماد وإغلاق الطلب"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-[var(--foreground)]">بيانات المشروع</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">مرحلة المشروع</label>
                  <p className="mt-1 text-sm">{appData.stage}</p>
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">حجم الفريق</label>
                  <p className="mt-1 text-sm">{appData.teamSize} أعضاء</p>
                </div>
              </div>
            </section>
            <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-[var(--foreground)]">تحديث الحالة</h3>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as AppStatus)}
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {Object.entries(STATUS_CONFIG).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
