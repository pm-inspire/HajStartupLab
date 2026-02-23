"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    legalName: "",
    crNumber: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/nda");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            بيانات الشركة (KYC)
          </h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            أكمل البيانات الرسمية لشركتك للتحقق والمتابعة. نلتزم بحماية بياناتك وفق PDPL.
          </p>
        </div>
        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="الاسم القانوني للشركة"
              value={form.legalName}
              onChange={(e) => setForm({ ...form, legalName: e.target.value })}
              placeholder="الشركة السعودية للابتكار"
              required
            />
            <Input
              label="رقم السجل التجاري"
              value={form.crNumber}
              onChange={(e) => setForm({ ...form, crNumber: e.target.value })}
              placeholder="1234567890"
              required
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="المدينة"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="الرياض"
                required
              />
              <Input
                label="رقم الجوال"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="05xxxxxxxx"
                required
              />
            </div>
            <Input
              label="العنوان"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="الحي، الشارع، المبنى"
              required
            />
            <Input
              label="الموقع الإلكتروني (اختياري)"
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://"
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[var(--foreground)]">
                وصف مختصر عن الشركة
              </label>
              <textarea
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-3 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                rows={4}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="نشاط الشركة وحلولها المبتكرة..."
              />
            </div>
            <Button type="submit" className="w-full">
              حفظ ومتابعة إلى اتفاقية السرية
            </Button>
            <p className="text-center text-sm text-[var(--foreground-muted)]">
              تسجيل مفتوح لبعض المستقلين — يمكنك{" "}
              <button
                type="button"
                onClick={() => router.push("/nda")}
                className="font-medium text-[var(--accent)] hover:underline"
              >
                تخطي والمتابعة إلى اتفاقية السرية
              </button>
            </p>
          </form>
        </Card>
      </main>
    </div>
  );
}
