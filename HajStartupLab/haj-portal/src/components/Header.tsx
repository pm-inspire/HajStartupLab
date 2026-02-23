"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background-card)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-semibold text-[var(--foreground)]">
          بوابة الحج للابتكار
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
          >
            الرئيسية
          </Link>
          <Link
            href="/login"
            className="text-[var(--foreground-muted)] transition hover:text-[var(--foreground)]"
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-white transition hover:bg-[var(--accent-hover)]"
          >
            إنشاء حساب
          </Link>
        </nav>
      </div>
    </header>
  );
}
