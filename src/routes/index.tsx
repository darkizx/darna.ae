import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Upload, Bot, MapPin, BarChart3, ShieldCheck, ArrowLeft,
  FileText, Trash2, Lightbulb, Droplet, TrafficCone, Trees,
  Building2, Users, CheckCircle2, ChevronLeft
} from "lucide-react";
import heroImg from "@/assets/hero-city.jpg";
import logo from "@/assets/darna-logo.png";

export const Route = createFileRoute("/")({ component: Home });

const services = [
  { t: "بلاغ صيانة طرق", i: TrafficCone, to: "/report" },
  { t: "نفايات ونظافة", i: Trash2, to: "/report" },
  { t: "إنارة عامة", i: Lightbulb, to: "/report" },
  { t: "مياه وصرف", i: Droplet, to: "/report" },
  { t: "حدائق ومرافق", i: Trees, to: "/report" },
  { t: "مخالفات بناء", i: Building2, to: "/report" },
  { t: "خدمات المجتمع", i: Users, to: "/assistant" },
  { t: "كل الخدمات", i: FileText, to: "/report" },
];

function Home() {
  return (
    <div className="relative">
      {/* HERO — formal */}
      <section className="relative border-b border-border bg-white">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="أفق مدن دولة الإمارات" className="w-full h-full object-cover opacity-[0.08]" width={1920} height={1088} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/85 to-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-[11px] official-pill inline-flex px-3 py-1.5 rounded-sm mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span className="font-bold">منصة حكومية رسمية</span>
                <span className="opacity-50">·</span>
                <span>دولة الإمارات العربية المتحدة</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-[1.15] navy-text">
                دارنا
                <span className="block text-xl md:text-2xl mt-3 font-bold text-foreground/85">
                  المنصة الموحّدة للبلديات الذكية في الإمارات
                </span>
              </h1>
              <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                خدمات بلدية رقمية موثوقة لجميع إمارات الدولة. أبلغ، تابع، وشارك في بناء مدنٍ
                أكثر استدامة وأماناً بإشراف الجهات الحكومية المختصة.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-sm font-bold">
                  <Link to="/report"><Upload className="ms-2 w-4 h-4" /> تقديم بلاغ</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-sm border-border hover:bg-muted">
                  <Link to="/assistant"><Bot className="ms-2 w-4 h-4" /> المساعد الرسمي</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.45_0.13_155)]" /> معتمدة من الجهات البلدية</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.45_0.13_155)]" /> حماية بيانات وفق معايير UAE PASS</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[oklch(0.45_0.13_155)]" /> متاحة 24/7</span>
              </div>
            </div>

            <div className="hidden lg:block">
              <img src={logo} alt="شعار دارنا" width={260} height={260} className="w-64 h-64 object-contain drop-shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Announcement strip */}
      <section className="bg-[oklch(0.97_0.005_90)] border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 text-sm">
          <span className="bg-accent text-accent-foreground text-[10px] font-bold px-2 py-1 rounded-sm">إعلان رسمي</span>
          <span className="text-foreground/80">إطلاق المرحلة الثانية من منصة دارنا لتشمل خدمات الاستدامة الحضرية في جميع الإمارات.</span>
          <Link to="/dashboard" className="ms-auto hidden sm:flex items-center gap-1 text-accent font-bold hover:underline">
            التفاصيل <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* E-Services grid (government style) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8 border-b border-border pb-4">
          <div>
            <div className="text-xs text-accent font-bold mb-1">الخدمات الإلكترونية</div>
            <h2 className="text-2xl md:text-3xl font-black navy-text">خدمات البلديات الرقمية</h2>
          </div>
          <Link to="/report" className="text-sm text-accent font-bold hover:underline hidden sm:inline">عرض الكل ←</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <Link
              key={i}
              to={s.to}
              className="group bg-white border border-border hover:border-accent rounded-sm p-5 transition-colors"
            >
              <div className="w-11 h-11 rounded-sm bg-muted group-hover:bg-accent/10 flex items-center justify-center mb-4">
                <s.i className="w-5 h-5 text-accent" />
              </div>
              <div className="font-bold text-sm navy-text">{s.t}</div>
              <div className="mt-3 text-[11px] text-muted-foreground flex items-center gap-1">
                ابدأ الخدمة <ChevronLeft className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* KPI strip */}
      <section className="bg-[oklch(0.27_0.06_260)] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "بلاغ نشط", value: "2,847" },
            { label: "تم حلها اليوم", value: "412" },
            { label: "إمارات مغطاة", value: "7" },
            { label: "رضا المتعاملين", value: "94%" },
          ].map((s, i) => (
            <div key={i} className={i > 0 ? "md:border-r md:border-white/15 md:pr-6" : ""}>
              <div className="text-3xl md:text-4xl font-black">{s.value}</div>
              <div className="text-xs opacity-70 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="text-xs text-accent font-bold mb-2">ركائز المنصة</div>
          <h2 className="text-3xl md:text-4xl font-black navy-text">منظومة حكومية متكاملة</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            تعمل دارنا وفق منظومة موحّدة تربط المواطنين والمقيمين بالجهات البلدية في جميع الإمارات.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            { t: "تصنيف ذكي للبلاغات", d: "نظام تحليل ذكي يصنّف البلاغات حسب الفئة والأولوية ويوجّهها للجهة المختصة.", i: Bot },
            { t: "خريطة الإمارات الموحّدة", d: "عرض تفاعلي حي لجميع البلاغات البلدية في الإمارات السبع على خريطة موحّدة.", i: MapPin },
            { t: "تحليلات حكومية تنبؤية", d: "لوحات بيانات لصانعي القرار لرصد أداء الخدمات البلدية ومؤشرات الاستدامة.", i: BarChart3 },
          ].map((f, i) => (
            <div key={i} className="gov-card rounded-sm p-6">
              <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
                <f.i className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold navy-text mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="bg-white border border-border rounded-sm p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-xs text-accent font-bold mb-2">الخريطة الوطنية</div>
            <h3 className="text-2xl md:text-3xl font-black navy-text">استكشف بلاغات الإمارات على الخريطة</h3>
            <p className="text-muted-foreground mt-2 max-w-xl">عرض مكاني لحظي لجميع البلاغات البلدية المسجّلة في المنصة.</p>
          </div>
          <Button asChild size="lg" className="bg-[oklch(0.27_0.06_260)] hover:bg-[oklch(0.32_0.06_260)] text-white rounded-sm">
            <Link to="/map">فتح الخريطة <ArrowLeft className="ms-2 w-4 h-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Government Footer */}
      <footer className="bg-[oklch(0.20_0.03_260)] text-white/85 mt-10">
        <div className="flag-bar" />
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="" width={48} height={48} className="w-12 h-12 object-contain bg-white/5 rounded-sm p-1" />
              <div>
                <div className="font-black text-white">دارنا</div>
                <div className="text-[10px] opacity-60 tracking-widest">DARNA · UAE GOV</div>
              </div>
            </div>
            <p className="text-xs opacity-70 leading-relaxed">
              المنصة الرسمية الموحّدة للبلديات الذكية في دولة الإمارات العربية المتحدة.
            </p>
          </div>
          <FooterCol title="الخدمات" links={[["تقديم بلاغ", "/report"], ["الخريطة التفاعلية", "/map"], ["المساعد الرسمي", "/assistant"], ["لوحة التحكم", "/dashboard"]]} />
          <FooterCol title="عن المنصة" links={[["الرؤية والرسالة", "/"], ["الجهات الشريكة", "/"], ["الأخبار والإعلانات", "/"], ["تواصل معنا", "/"]]} />
          <div>
            <div className="font-bold text-white mb-3">معلومات التواصل</div>
            <ul className="space-y-2 text-xs opacity-80">
              <li>مركز الاتصال: 800-DARNA</li>
              <li>البريد: info@darna.gov.ae</li>
              <li>متاح: 24 ساعة / 7 أيام</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] opacity-70">
            <div>© 2026 دارنا — جميع الحقوق محفوظة لحكومة دولة الإمارات العربية المتحدة</div>
            <div className="flex items-center gap-4">
              <span>سياسة الخصوصية</span>
              <span>·</span>
              <span>شروط الاستخدام</span>
              <span>·</span>
              <span>إمكانية الوصول</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="font-bold text-white mb-3">{title}</div>
      <ul className="space-y-2 text-xs opacity-80">
        {links.map(([l, h]) => (
          <li key={l}><Link to={h} className="hover:text-white hover:underline">{l}</Link></li>
        ))}
      </ul>
    </div>
  );
}
