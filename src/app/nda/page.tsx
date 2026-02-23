"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function NDAPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (agreed) router.push("/submit-idea");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            اتفاقية السرية (NDA)
          </h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            يرجى قراءة النص والتوقيع إلكترونياً للمتابعة.
          </p>
        </div>
        <Card>
          <div className="max-h-80 overflow-y-auto rounded-lg border border-[var(--border)] bg-[var(--beige)] p-6 text-[var(--foreground-muted)] text-sm leading-relaxed">
            <h3 className="font-semibold text-[var(--foreground)]">اتفاقية عدم الإفصاح</h3>
            <p className="mt-4">
              تُبرم هذه الاتفاقية بين منصة برامج الابتكار في قطاع الحج («المنصة») والشركة الناشئة
              («الطرف الثاني») بخصوص تبادل المعلومات السرية ذات الصلة ببرامج الابتكار والحاضنات.
            </p>
            <p className="mt-4">
              يتعهد الطرف الثاني بعدم إفشاء أي معلومات سرية أو استغلالها لأغراض غير المتفق عليها،
              والالتزام بمعايير حماية البيانات المعمول بها في المملكة العربية السعودية (PDPL).
            </p>
            <p className="mt-4">
              يتم التوقيع الإلكتروني عبر الموافقة أدناه ويعتبر نافذاً قانونياً.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-6">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span className="text-sm text-[var(--foreground)]">
                أوافق على بنود اتفاقية السرية وأوقّع عليها إلكترونياً.
              </span>
            </label>
            <Button
              type="submit"
              className="mt-6 w-full"
              disabled={!agreed}
            >
              توقيع والمتابعة
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
