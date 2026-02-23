"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === "form") {
      setStep("otp");
    } else {
      router.push("/profile");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-md px-4 py-12">
        <Card>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            {step === "form" ? "إنشاء حساب شركة ناشئة" : "تفعيل الحساب"}
          </h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            {step === "form"
              ? "أدخل بيانات شركتك وسنرسل لك رمز التحقق على البريد الإلكتروني."
              : "أدخل الرمز المرسل إلى بريدك الإلكتروني."}
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {step === "form" ? (
              <>
                <Input
                  label="اسم الشركة"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="مثال: شركة الحلول الذكية"
                  required
                />
                <Input
                  label="البريد الإلكتروني"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company@example.com"
                  required
                />
                <Input
                  label="كلمة المرور"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </>
            ) : (
              <Input
                label="رمز التحقق (OTP)"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                maxLength={6}
                required
              />
            )}
            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                {step === "form" ? "متابعة وإرسال الرمز" : "تفعيل الحساب"}
              </Button>
              {step === "otp" && (
                <Button type="button" variant="outline" onClick={() => setStep("form")}>
                  رجوع
                </Button>
              )}
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
            لديك حساب؟{" "}
            <Link href="/login" className="font-medium text-[var(--accent)] hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
