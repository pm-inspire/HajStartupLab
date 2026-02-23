export type AppStatus = "submitted" | "shortlisted" | "rejected" | "pilot";

export const STATUS_CONFIG: Record<AppStatus, { label: string; color: string }> = {
  submitted: { label: "مقدّم", color: "bg-slate-100 text-slate-800" },
  shortlisted: { label: "في القائمة المختصرة", color: "bg-amber-100 text-amber-800" },
  rejected: { label: "مرفوض", color: "bg-red-100 text-red-800" },
  pilot: { label: "تجريبي", color: "bg-emerald-100 text-emerald-800" },
};

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
};

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
  },
  {
    id: "app-2",
    title: "تطبيق توجيه الحشود",
    program: "حلول إدارة الحشود",
    status: "shortlisted",
    statusColor: "bg-amber-100 text-amber-800",
    submittedAt: "2025-02-15",
    problem: "ازدحام في نقاط محددة وعدم توزيع الحشود بشكل آمن.",
    solution: "تطبيق يعتمد على تحليل البيانات والخرائط الحية لتوجيه الحجاج.",
    marketSize: "سوق إدارة الحشود في موسم الحج بحجم كبير مع تطلع لتعميم الحل على مناسبات أخرى.",
    stage: "نمو",
    teamSize: "8",
    prototypeLink: "https://marvelapp.com/prototype",
    pitchDeckName: "crowd-pitch.pdf",
    demoVideoName: "crowd-demo.mp4",
    committeeNotes: "مقبول للمقابلة. يرجى إحضار عرض توضيحي للتجربة الميدانية إن وُجد.",
  },
  {
    id: "app-3",
    title: "نموذج إسكان الحجاج",
    program: "برنامج الإسكان",
    status: "rejected",
    statusColor: "bg-red-100 text-red-800",
    submittedAt: "2025-02-10",
    problem: "صعوبة حجز الإسكان المناسب خلال الموسم.",
    solution: "منصة ربط بين مقدمي الإسكان والحجاج مع تحقق ومراجعات.",
    marketSize: "سوق إسكان الحجاج محلياً وإقليمياً.",
    stage: "فكرة",
    teamSize: "3",
    committeeNotes: "عدم توافق المعايير المطلوبة للبرنامج في المرحلة الحالية. يُنصح بإعادة التقديم بعد استكمال النموذج الأولي.",
  },
  {
    id: "app-4",
    title: "منصة إعاشة ذكية",
    program: "حاضنة الإعاشة",
    status: "pilot",
    statusColor: "bg-emerald-100 text-emerald-800",
    submittedAt: "2025-02-05",
    problem: "توزيع وجبات الإعاشة وضمان الجودة.",
    solution: "تطبيق تتبع وتقييم لوجبات الإعاشة مع شكاوى وتحسين مستمر.",
    marketSize: "سوق الإعاشة في المواسم الدينية.",
    stage: "نموذج أولي (MVP)",
    teamSize: "6",
    prototypeLink: "https://pilot.example.com",
    committeeNotes: "تم اختيار المشروع للمرحلة التجريبية. سيتم التواصل لتحديد موعد انطلاق التجربة.",
  },
];

export function getApplicationById(id: string): ApplicationDetail | undefined {
  return APPLICATIONS.find((app) => app.id === id);
}
