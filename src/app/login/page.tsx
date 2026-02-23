"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-md px-4 py-12">
        <Card>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">
            تسجيل الدخول
          </h1>
          <p className="mt-2 text-[var(--foreground-muted)]">
            أدخل بيانات الدخول لحساب شركتك الناشئة.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
            <Button type="submit" className="w-full">
              تسجيل الدخول
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-[var(--foreground-muted)]">
            لا تملك حساباً؟{" "}
            <Link href="/signup" className="font-medium text-[var(--accent)] hover:underline">
              إنشاء حساب
            </Link>
          </p>
        </Card>
      </main>
    </div>
  );
}
