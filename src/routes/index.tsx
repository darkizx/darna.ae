import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Upload, Bot, MapPin, BarChart3, ShieldCheck, Sparkles, ArrowLeft } from "lucide-react";
import heroImg from "@/assets/hero-city.jpg";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="UAE futuristic smart city skyline" className="w-full h-full object-cover opacity-50" width={1920} height={1088} />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs mb-6 animate-float">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="gold-text font-bold">مدعومة بالذكاء الاصطناعي Gemini</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              <span className="neon-text">دارنا</span>
              <span className="block text-2xl md:text-3xl mt-4 text-foreground font-bold">
                منصة البلدية الذكية
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
              نظام بلدي متكامل لدولة الإمارات يعتمد على الذكاء الاصطناعي لتحليل البلاغات،
              ومراقبة المدينة الذكية، وتقديم رؤى تنبؤية لمستقبل أفضل.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild size="lg" className="gradient-neon-bg text-primary-foreground font-bold animate-pulse-glow hover:opacity-90">
                <Link to="/report"><Upload className="ms-2" /> رفع بلاغ</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="glass border-primary/40 hover:bg-primary/10">
                <Link to="/assistant"><Bot className="ms-2" /> المساعد الذكي</Link>
              </Button>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {[
              { label: "بلاغات نشطة", value: "2,847", icon: BarChart3 },
              { label: "تم حلها اليوم", value: "412", icon: ShieldCheck },
              { label: "مدن مغطاة", value: "7", icon: MapPin },
              { label: "رضا المواطنين", value: "94%", icon: Sparkles },
            ].map((s, i) => (
              <div key={i} className="glass rounded-2xl p-5 hover:neon-border transition-all">
                <s.icon className="w-5 h-5 text-primary mb-3" />
                <div className="text-3xl font-black neon-text">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-black">قدرات <span className="neon-text">ذكية</span> متقدمة</h2>
          <p className="text-muted-foreground mt-3">نظام بلدي مستقبلي يجمع بين الإنسان والذكاء الاصطناعي</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { t: "تصنيف ذكي للبلاغات", d: "Gemini يحلل ويصنّف البلاغات تلقائياً حسب الفئة والأولوية والشعور.", i: Bot },
            { t: "خريطة UAE الذكية", d: "عرض حي وتفاعلي لجميع بلاغات الإمارات على خريطة OpenStreetMap.", i: MapPin },
            { t: "تحليلات تنبؤية", d: "رؤى ذكية لتحسين الخدمات البلدية ومراقبة المرور والنفايات.", i: BarChart3 },
          ].map((f, i) => (
            <div key={i} className="glass rounded-2xl p-7 group hover:neon-border transition-all">
              <div className="w-12 h-12 rounded-xl gradient-neon-bg flex items-center justify-center mb-5 group-hover:animate-pulse-glow">
                <f.i className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Map preview */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass-strong rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute -top-20 -end-20 w-72 h-72 rounded-full gradient-neon-bg opacity-20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-3xl font-black">استكشف <span className="neon-text">مدن الإمارات</span> الذكية</h3>
              <p className="text-muted-foreground mt-2">خريطة تفاعلية حية لجميع البلاغات والمشاريع البلدية</p>
            </div>
            <Button asChild size="lg" className="gradient-neon-bg text-primary-foreground font-bold">
              <Link to="/map">فتح الخريطة <ArrowLeft className="ms-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-xs text-muted-foreground">
        دارنا © 2026 — منصة الإمارات للبلدية الذكية · مدعومة بـ Lovable AI
      </footer>
    </div>
  );
}
