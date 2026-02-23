"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background-card)]/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[var(--accent)]">استدام</span>
          <span className="text-xs text-[var(--foreground-muted)] hidden sm:block">بوابة الحج للابتكار</span>
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
          <Link
            href="/admin"
            className="rounded-lg border border-[var(--border)] bg-[var(--background-card)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--beige)]"
          >
            ⚙️ لوحة الإدارة
          </Link>
        </nav>
      </div>
    </header>
  );
}
