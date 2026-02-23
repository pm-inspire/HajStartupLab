"use client";

import Link from "next/link";
import Header from "@/components/Header";

const PAGES = [
  { path: "/", title: "الرئيسية", desc: "لاندينج + رحلة الشركة + مجالات الابتكار" },
  { path: "/login", title: "تسجيل الدخول", desc: "نموذج إيميل وكلمة مرور" },
  { path: "/signup", title: "إنشاء حساب", desc: "تسجيل شركة ناشئة + OTP" },
  { path: "/profile", title: "الملف التعريفي (KYC)", desc: "بيانات الشركة الرسمية" },
  { path: "/nda", title: "اتفاقية السرية (NDA)", desc: "قراءة وتوقيع الاتفاقية" },
  { path: "/submit-idea", title: "تقديم الفكرة", desc: "تقديم فكرة لبرنامج ابتكار" },
  { path: "/dashboard", title: "لوحة التحكم", desc: "قائمة الطلبات والحالة" },
  { path: "/application/app-1", title: "تفاصيل طلب (مثال 1)", desc: "منصة تتبع الحجاج الصحية" },
  { path: "/application/app-2", title: "تفاصيل طلب (مثال 2)", desc: "تطبيق توجيه الحشود" },
];

export default function PagesIndex() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          فهرس صفحات المشروع
        </h1>
        <p className="mt-2 text-[var(--foreground-muted)]">
          انقر على أي رابط لفتح الصفحة
        </p>
        <ul className="mt-8 space-y-3">
          {PAGES.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="block rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 transition hover:border-[var(--accent)] hover:shadow-md"
              >
                <span className="font-semibold text-[var(--accent)]">{page.title}</span>
                <span className="mr-2 text-[var(--foreground-muted)]">— {page.path}</span>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">{page.desc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
