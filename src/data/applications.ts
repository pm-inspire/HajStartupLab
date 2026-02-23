export type AppStatus = "submitted" | "shortlisted" | "rejected" | "pilot";

export const STATUS_CONFIG: Record<AppStatus, { label: string; color: string }> = {
  submitted: { label: "مقدّم", color: "bg-slate-100 text-slate-800" },
  shortlisted: { label: "في القائمة المختصرة", color: "bg-amber-100 text-amber-800" },
  rejected: { label: "مرفوض", color: "bg-red-100 text-red-800" },
  pilot: { label: "تجريبي", color: "bg-emerald-100 text-emerald-800" },
};

// ===== نظام التقييم =====

export type EvaluationDecision = "accepted" | "rejected" | "shortlisted" | "needs_interview" | "needs_docs" | "pending";

export const DECISION_CONFIG: Record<EvaluationDecision, { label: string; color: string }> = {
  accepted: { label: "مقبول", color: "bg-emerald-100 text-emerald-800" },
  rejected: { label: "مرفوض", color: "bg-red-100 text-red-800" },
  shortlisted: { label: "احتياط", color: "bg-amber-100 text-amber-800" },
  needs_interview: { label: "يحتاج مقابلة", color: "bg-blue-100 text-blue-800" },
  needs_docs: { label: "يحتاج استكمال مستندات", color: "bg-purple-100 text-purple-800" },
  pending: { label: "لا يوجد قرار بعد", color: "bg-slate-100 text-slate-600" },
};

export type VoteChoice = "approve" | "reject" | "abstain";

export type EvaluationCriteria = {
  id: string;
  name: string;
  description: string;
  weight: number; // percentage e.g. 30
};

export const DEFAULT_CRITERIA: EvaluationCriteria[] = [
  { id: "c1", name: "جدوى الفكرة", description: "مدى قابلية الفكرة للتطبيق وتحقيق الأثر", weight: 30 },
  { id: "c2", name: "الأثر على منظومة الحج", description: "مدى ارتباط الحل باحتياجات الحج الفعلية", weight: 30 },
  { id: "c3", name: "قابلية التنفيذ", description: "جاهزية التقنية والموارد اللازمة للتنفيذ", weight: 20 },
  { id: "c4", name: "جاهزية الفريق", description: "كفاءة الفريق وخبراتهم ذات الصلة", weight: 20 },
];

export type ReviewerScore = {
  criteriaId: string;
  score: number; // 1-5
  note?: string;
};

export type ReviewerEvaluation = {
  reviewerId: string;
  reviewerName: string;
  committee: string;
  status: "pending" | "draft" | "completed";
  scores: ReviewerScore[];
  generalComment?: string;
  tag?: "strong" | "medium" | "weak";
  submittedAt?: string;
};

export type CommitteeVote = {
  memberId: string;
  memberName: string;
  vote: VoteChoice;
};

export type EvaluationSession = {
  blindReview: boolean;
  committees: string[];
  reviewers: ReviewerEvaluation[];
  votes: CommitteeVote[];
  finalDecision: EvaluationDecision;
  officialComment?: string;
  decisionLockedAt?: string;
};

export const DEFAULT_EVALUATION_SESSION: EvaluationSession = {
  blindReview: false,
  committees: ["لجنة تقنية", "لجنة أعمال"],
  reviewers: [
    {
      reviewerId: "r1",
      reviewerName: "أ. محمد العتيبي",
      committee: "لجنة تقنية",
      status: "completed",
      scores: [
        { criteriaId: "c1", score: 4, note: "فكرة واعدة مع حاجة لتوضيح التقنية" },
        { criteriaId: "c2", score: 5, note: "ارتباط واضح بمنظومة الحج الصحية" },
        { criteriaId: "c3", score: 3, note: "يحتاج إلى خطة تقنية أوضح" },
        { criteriaId: "c4", score: 4, note: "فريق متكامل" },
      ],
      generalComment: "مشروع قوي يستحق المتابعة مع بعض التوضيحات التقنية",
      tag: "strong",
      submittedAt: "2025-03-01",
    },
    {
      reviewerId: "r2",
      reviewerName: "د. سارة الزهراني",
      committee: "لجنة أعمال",
      status: "completed",
      scores: [
        { criteriaId: "c1", score: 4, note: "" },
        { criteriaId: "c2", score: 4, note: "" },
        { criteriaId: "c3", score: 4, note: "" },
        { criteriaId: "c4", score: 3, note: "يحتاج عضو متخصص في المبيعات" },
      ],
      generalComment: "النموذج التجاري يحتاج تطوير إضافي",
      tag: "medium",
      submittedAt: "2025-03-02",
    },
    {
      reviewerId: "r3",
      reviewerName: "م. خالد الدوسري",
      committee: "لجنة تقنية",
      status: "pending",
      scores: [],
      generalComment: "",
    },
  ],
  votes: [
    { memberId: "r1", memberName: "أ. محمد العتيبي", vote: "approve" },
    { memberId: "r2", memberName: "د. سارة الزهراني", vote: "approve" },
  ],
  finalDecision: "pending",
  officialComment: "",
};

// ===== بيانات الطلبات =====

export type ApplicationDetail = {
  id: string;
  title: string;
  program: string;
  status: AppStatus;
  statusColor: string;
  submittedAt: string;
  problem: string;
  solution: string;
  marketSize: string;
  stage: string;
  stageOther?: string;
  teamSize: string;
  prototypeLink?: string;
  pitchDeckName?: string;
  demoVideoName?: string;
  committeeNotes?: string;
  evaluation?: EvaluationSession;
};

export function getApplicationById(id: string): ApplicationDetail | undefined {
  return APPLICATIONS.find((app) => app.id === id);
}

export const APPLICATIONS: ApplicationDetail[] = [
  {
    id: "app-1",
    title: "منصة تتبع الحجاج الصحية",
    program: "حاضنة الحج للصحة الرقمية",
    status: "submitted",
    statusColor: "bg-slate-100 text-slate-800",
    submittedAt: "2025-02-20",
    problem: "صعوبة متابعة الحالة الصحية للحجاج في الوقت الفعلي وتنسيق الخدمات الطبية.",
    solution: "منصة موحدة تربط الجهات الصحية بالحجاج مع لوحة تحكم وتنبيهات.",
    marketSize: "السوق المستهدف يشمل ملايين الحجاج والجهات الصحية المعتمدة، مع نمو متوقع في الحلول الرقمية الصحية.",
    stage: "نموذج أولي (MVP)",
    teamSize: "5",
    prototypeLink: "https://figma.com/prototype/example",
    pitchDeckName: "pitch-deck-haj-health.pdf",
    demoVideoName: "demo-video.mp4",
    committeeNotes: "الفكرة ذات صلة واضحة بمنظومة الحج. يُقترح طلب توضيح بخصوص التكامل مع الأنظمة الصحية الحالية.",
    evaluation: DEFAULT_EVALUATION_SESSION,
  },
  {
    id: "app-2",
    title: "تطبيق توجيه المشاة",
    program: "حلول إدارة المشاة",
    status: "shortlisted",
    statusColor: "bg-amber-100 text-amber-800",
    submittedAt: "2025-02-15",
    problem: "ازدحام في نقاط محددة وعدم توزيع المشاة بشكل أمن.",
    solution: "تطبيق يعتمد على تحليل البيانات والخرائط لتوجيه الحجاج.",
    marketSize: "سوق إدارة المشاة في موسم الحج بحجم كبير مع تطلع لمناسبات أخرى.",
    stage: "نمو",
    teamSize: "8",
    evaluation: {
      blindReview: false,
      committees: ["لجنة تقنية"],
      reviewers: [],
      votes: [],
      finalDecision: "pending",
      officialComment: "",
    },
  },
  {
    id: "app-3",
    title: "منصة الخدمات اللوجستية الذكية",
    program: "برنامج الابتكار اللوجستي",
    status: "pilot",
    statusColor: "bg-emerald-100 text-emerald-800",
    submittedAt: "2025-02-10",
    problem: "تأخر في توصيل الخدمات والإمدادات لمواقع الحجاج.",
    solution: "منصة ذكية لإدارة سلسلة التوريد خلال موسم الحج.",
    marketSize: "السوق اللوجستي في موسم الحج يُقدر بمئات الملايين سنوياً.",
    stage: "منتج مكتمل",
    teamSize: "12",
    evaluation: {
      blindReview: true,
      committees: ["لجنة تقنية", "لجنة أعمال", "لجنة تشغيلية"],
      reviewers: [],
      votes: [],
      finalDecision: "accepted",
      officialComment: "تم قبول المشروع بناءً على قوة النموذج التشغيلي والفريق المتكامل.",
      decisionLockedAt: "2025-03-05",
    },
  },
];
