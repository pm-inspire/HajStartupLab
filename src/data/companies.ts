export type Company = {
  id: string;
  companyName: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string;
};

export const COMPANIES: Company[] = [
  {
    id: "c-1",
    companyName: "شركة الحلول الذكية",
    email: "smart@company.com",
    status: "active",
    createdAt: "2025-02-01",
  },
  {
    id: "c-2",
    companyName: "مؤسسة الابتكار الرقمي",
    email: "digital@innovation.sa",
    status: "active",
    createdAt: "2025-02-10",
  },
  {
    id: "c-3",
    companyName: "شركة تقنيات الحج",
    email: "haj@tech.com",
    status: "inactive",
    createdAt: "2025-02-14",
  },
];

export function getCompanyById(id: string): Company | undefined {
  return COMPANIES.find((c) => c.id === id);
}

export type CompanyRequest = {
  id: string;
  title: string;
  program: string;
  status: string;
  submittedAt: string;
};

const COMPANY_REQUESTS: Record<string, CompanyRequest[]> = {
  "c-1": [
    { id: "app-1", title: "منصة تتبع الحجاج الصحية", program: "حاضنة الحج للصحة الرقمية", status: "مقدّم", submittedAt: "2025-02-20" },
    { id: "app-4", title: "منصة إعاشة ذكية", program: "حاضنة الإعاشة", status: "تجريبي", submittedAt: "2025-02-05" },
  ],
  "c-2": [
    { id: "app-2", title: "تطبيق توجيه الحشود", program: "حلول إدارة الحشود", status: "في القائمة المختصرة", submittedAt: "2025-02-15" },
  ],
  "c-3": [
    { id: "app-3", title: "نموذج إسكان الحجاج", program: "برنامج الإسكان", status: "مرفوض", submittedAt: "2025-02-10" },
  ],
};

export function getRequestsByCompanyId(companyId: string): CompanyRequest[] {
  return COMPANY_REQUESTS[companyId] ?? [];
}