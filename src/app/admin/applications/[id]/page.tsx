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

  // Evaluation States
  const [blindReview, setBlindReview] = useState(appData?.evaluation?.blindReview ?? false);
  const [decision, setDecision] = useState<EvaluationDecision>(appData?.evaluation?.finalDecision ?? "pending");
  const [officialComment, setOfficialComment] = useState(appData?.evaluation?.officialComment ?? "");

  // Weights State
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);

  // Committee Management
  const ALL_COMMITTEES = [
    { id: "health", name: "اللجنة الصحية" },
    { id: "tech", name: "اللجنة التقنية" },
    { id: "finance", name: "اللجنة المالية" },
    { id: "ux", name: "لجنة تجربة المستخدم" }
  ];
  const [selectedCommittees, setSelectedCommittees] = useState<string[]>(["health", "tech"]);

  // Mock results
  const committeeResults = [
    { id: "health", status: "completed", score: 85, evaluator: "د. أحمد علي" },
    { id: "tech", status: "completed", score: 92, evaluator: "م. سارة خالد" },
    { id: "finance", status: "pending", score: 0, evaluator: "-" }
  ];

  // Audit Log State
  const [auditLog, setAuditLog] = useState([
    { id: 1, action: "تقديم الطلب بنجاح", user: "منصة تتبع الحجاج", time: "2025-02-20 10:30", type: "submit" },
    { id: 2, action: "مراجعة إدارية أولية", user: "م. خالد العمري", time: "2025-02-21 09:15", type: "review" },
    { id: 3, action: "تعديل مصفوفة المعايير للمسار", user: "الإدارة", time: "2025-02-22 14:20", type: "config" },
  ]);

  const logAction = (action: string, type: string) => {
    const newEntry = {
      id: Date.now(),
      action,
      user: "م. سارة خالد (أنت)",
      time: new Date().toLocaleString("ar-EG", { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      type
    };
    setAuditLog(prev => [newEntry, ...prev]);
  };

  if (!appData) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateWeight = (id: string, newWeight: number) => {
    const item = criteria.find(c => c.id === id);
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, weight: newWeight } : c));
    logAction(`تعديل وزن معيار "${item?.name}" إلى ${newWeight}%`, "config");
  };

  const toggleCommittee = (id: string) => {
    const name = ALL_COMMITTEES.find(c => c.id === id)?.name;
    const isAdding = !selectedCommittees.includes(id);
    setSelectedCommittees(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
    logAction(isAdding ? `تعيين "${name}" لتقييم الطلب` : `إزالة تعيين "${name}"`, "committee");
  };

  const currentStatusConfig = STATUS_CONFIG[status];
  const currentDecisionConfig = DECISION_CONFIG[decision];

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link href="/admin/applications" className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)]">
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
                          {criteria.map(c => (
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
                    <button onClick={() => logAction("إرسال تقييم المقيم الحالي", "review")} className="bg-[var(--accent)] text-white px-8 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition">
                      إرسال التقييم
                    </button>
                  </div>
                )}

                {evalSubTab === "admin" && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                      <h4 className="font-bold mb-4 text-[var(--foreground)]">تعديل أوزان المعايير (Matrix)</h4>
                      <p className="text-xs text-[var(--foreground-muted)] mb-6">يمكن للإدارة تعديل وزن كل معيار حسب أهميته لهذا المسار.</p>
                      <div className="space-y-4">
                        {criteria.map(c => (
                          <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border border-[var(--border)]">
                            <div>
                              <div className="text-sm font-bold">{c.name}</div>
                              <div className="text-xs text-[var(--foreground-muted)]">{c.description}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium text-[var(--foreground-muted)]">الوزن:</span>
                              <div className="flex items-center bg-[var(--border)]/30 rounded-lg overflow-hidden border border-[var(--border)]">
                                <input 
                                  type="number" 
                                  value={c.weight} 
                                  onChange={(e) => updateWeight(c.id, parseInt(e.target.value) || 0)}
                                  className="w-16 bg-transparent px-3 py-1 text-sm font-bold focus:outline-none"
                                />
                                <span className="px-2 text-sm font-bold bg-[var(--border)]">%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-slate-50 rounded-lg flex justify-between items-center text-sm font-bold">
                        <span>إجمالي الأوزان:</span>
                        <span className={criteria.reduce((a,b) => a + b.weight, 0) === 100 ? 'text-emerald-600' : 'text-red-600'}>
                          {criteria.reduce((a,b) => a + b.weight, 0)}%
                        </span>
                      </div>
                      <button onClick={handleSave} className="mt-6 w-full bg-[var(--accent)] text-white py-2 rounded-lg text-sm font-bold">حفظ مصفوفة الأوزان</button>
                    </div>

                    <div className="rounded-xl border border-dashed border-[var(--accent)] p-6 bg-[var(--accent)]/5">
                      <h4 className="font-bold text-[var(--accent)] mb-4 flex items-center gap-2">⚙️ إعدادات المشرف</h4>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">نظام المراجعة العمياء (Blind Review)</label>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              const newVal = !blindReview;
                              setBlindReview(newVal);
                              logAction(newVal ? "تفعيل نظام المراجعة العمياء" : "تعطيل نظام المراجعة العمياء", "config");
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${blindReview ? 'bg-[var(--accent)]' : 'bg-slate-300'}`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${blindReview ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                          <span className="text-sm">{blindReview ? 'مفعّل' : 'معطّل'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                      <h4 className="font-bold mb-4 text-[var(--foreground)]">تعيين لجان التقييم</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {ALL_COMMITTEES.map(committee => (
                          <label key={committee.id} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] cursor-pointer hover:bg-[var(--border)]/10">
                            <input 
                              type="checkbox" 
                              checked={selectedCommittees.includes(committee.id)}
                              onChange={() => toggleCommittee(committee.id)}
                              className="w-4 h-4 accent-[var(--accent)]"
                            />
                            <span className="text-sm font-medium">{committee.name}</span>
                          </label>
                        ))}
                      </div>
                      <button onClick={handleSave} className="w-full bg-[var(--accent)] text-white py-2 rounded-lg text-sm font-bold">حفظ تعيينات اللجان</button>
                    </div>

                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                      <h4 className="font-bold mb-4 text-[var(--foreground)]">نتائج تقييم اللجان</h4>
                      <div className="overflow-x-auto text-right text-sm">
                        <table className="w-full">
                          <thead className="bg-[var(--border)]/30 font-bold">
                            <tr><th className="p-3">اللجنة</th><th className="p-3">المقيّم</th><th className="p-3">الحالة</th><th className="p-3">الدرجة</th></tr>
                          </thead>
                          <tbody className="divide-y divide-[var(--border)]">
                            {committeeResults.map(res => (
                              <tr key={res.id}>
                                <td className="p-3 font-medium">{ALL_COMMITTEES.find(c => c.id === res.id)?.name}</td>
                                <td className="p-3 text-[var(--foreground-muted)]">{res.evaluator}</td>
                                <td className="p-3">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${res.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {res.status === 'completed' ? 'تم التقييم' : 'قيد الانتظار'}
                                  </span>
                                </td>
                                <td className="p-3 font-bold text-[var(--accent)]">{res.status === 'completed' ? `${res.score}/100` : '-'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {evalSubTab === "final" && (
                  <div className="space-y-6">
                    <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 space-y-6">
                      <label className="block text-sm font-bold">القرار النهائي للجنة</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(DECISION_CONFIG).map(([key, val]) => (
                          <button
                            key={key}
                            onClick={() => {
                              setDecision(key as any);
                              logAction(`تغيير قرار اللجنة النهائي إلى: ${val.label}`, "decision");
                            }}
                            className={`p-3 text-xs font-bold rounded-xl border transition ${
                              decision === key ? "border-[var(--accent)] bg-[var(--accent)]/5 text-[var(--accent)]" : "border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--foreground-muted)]"
                            }`}
                          >
                            {val.label}
                          </button>
                        ))}
                      </div>
                      <button onClick={handleSave} className="w-full bg-[var(--accent)] text-white py-3 rounded-xl font-bold">
                        {saved ? "✓ تم اعتماد القرار" : "اعتماد وإغلاق الطلب"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
                  <h3 className="mb-6 font-bold text-[var(--foreground)] flex items-center gap-2">📑 سجل نشاط الطلب (Audit Log)</h3>
                  <div className="relative space-y-8 before:absolute before:right-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-[var(--border)]">
                    {auditLog.map((log) => (
                      <div key={log.id} className="relative pr-8">
                        <div className={`absolute right-0 top-1 h-6 w-6 rounded-full border-4 border-[var(--background)] flex items-center justify-center ${
                          log.type === 'status' ? 'bg-blue-500' : 
                          log.type === 'committee' ? 'bg-purple-500' :
                          log.type === 'decision' ? 'bg-emerald-500' :
                          log.type === 'submit' ? 'bg-slate-700' : 'bg-slate-400'
                        }`} />
                        <div className="flex flex-col gap-1">
                          <div className="text-sm font-bold text-[var(--foreground)]">{log.action}</div>
                          <div className="flex gap-3 text-[10px] font-medium text-[var(--foreground-muted)]">
                            <span className="flex items-center gap-1">👤 {log.user}</span>
                            <span className="flex items-center gap-1">🕒 {log.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-[var(--foreground)]">بيانات المشروع</h3>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">مرحلة المشروع</label><p className="mt-1 text-sm">{appData.stage}</p></div>
                <div><label className="text-xs font-bold text-[var(--foreground-muted)] uppercase">حجم الفريق</label><p className="mt-1 text-sm">{appData.teamSize} أعضاء</p></div>
              </div>
            </section>
            <section className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-[var(--foreground)]">تحديث الحالة</h3>
              <select 
                value={status} 
                onChange={(e) => {
                  const newStatus = e.target.value as AppStatus;
                  setStatus(newStatus);
                  logAction(`تغيير حالة الطلب إلى: ${STATUS_CONFIG[newStatus].label}`, "status");
                }}
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
