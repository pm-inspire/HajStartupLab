import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16">
        <section className="rounded-2xl bg-[var(--beige)] p-12 text-center md:p-16">
          <h1 className="text-3xl font-bold text-[var(--foreground)] md:text-4xl lg:text-5xl">
                        استدام (حاضنة اعمال لخدمة ضيوف الرحمن)
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--foreground-muted)]">
            منصة رقمية لإدارة برامج الابتكار والحاضنات المتخصصة في قطاع الحج. قدّم مشروعك،
            انضم إلى البرامج، وارتقِ بحلولك المبتكرة لخدمة منظومة الحج.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-[var(--accent)] px-6 py-3 font-medium text-white transition hover:bg-[var(--accent-hover)]"
            >
              تسجيل شركة ناشئة
            </Link>
            <Link
              href="/login"
              className="rounded-lg border border-[var(--border)] bg-white px-6 py-3 font-medium text-[var(--foreground)] transition hover:bg-[var(--beige)]"
            >
              تسجيل الدخول
            </Link>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            رحلة الشركة الناشئة
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, title: "إنشاء حساب", desc: "سجّل شركتك وفعّل الحساب عبر OTP" },
              { step: 2, title: "الملف التعريفي", desc: "أكمل بيانات الشركة والتحقق (KYC)" },
              { step: 3, title: "اتفاقية السرية", desc: "وقّع NDA إلكترونياً" },
              { step: 4, title: "تقديم الفكرة", desc: "قدّم فكرتك وتابع الطلب من لوحة التحكم" },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)] font-semibold">
                  {item.step}
                </span>
                <h3 className="mt-4 font-semibold text-[var(--foreground)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--foreground-muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-2xl bg-[var(--beige)] p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-[var(--foreground)]">
            مجالات الابتكار
          </h2>
          <p className="mt-2 text-[var(--foreground-muted)]">
            نستهدف الشركات الناشئة في حلول مرتبطة بمنظومة الحج
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {["إعاشة", "الإسكان", "النقل واللوجستيات", "خدمات إثرائية", "مستلزمات أداء النسك"].map(
              (name) => (
                <li
                  key={name}
                  className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-[var(--foreground)]"
                >
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  {name}
                </li>
              )
            )}
          </ul>
        </section>

        <footer className="mt-20 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--foreground-muted)]">
          بوابة برامج الابتكار في قطاع الحج — متوافق مع أنظمة حماية البيانات (PDPL)
        </footer>
      </main>
    </div>
  );
}
