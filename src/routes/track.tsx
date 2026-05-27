import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listReports } from "@/lib/reports.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2, MapPin, Calendar, AlertCircle, CheckCircle2, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/track")({
  component: TrackPage,
  head: () => ({
    meta: [
      { title: "تتبع البلاغ — دارنا" },
      { name: "description", content: "أدخل رقم البلاغ لمتابعة حالته في منصة دارنا للبلديات الذكية." },
      { property: "og:title", content: "تتبع البلاغ — دارنا" },
      { property: "og:description", content: "تابع حالة بلاغك البلدي لحظياً." },
    ],
  }),
});

function TrackPage() {
  const fn = useServerFn(listReports);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return toast.error("الرجاء إدخال رقم البلاغ");
    setLoading(true);
    setSearched(true);
    try {
      const all = await fn();
      const q = query.trim().toLowerCase();
      const found = all.find((r: any) => r.id.toLowerCase().startsWith(q) || r.id.toLowerCase() === q);
      setResult(found ?? null);
      if (found) toast.success("تم العثور على البلاغ");
      else toast.error("لم نعثر على بلاغ بهذا الرقم");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 official-pill px-3 py-1.5 rounded-sm text-[11px] font-bold mb-4">
          <FileText className="w-3.5 h-3.5 text-accent" />
          خدمة تتبع البلاغات
        </div>
        <h1 className="text-3xl md:text-4xl font-black navy-text">تتبع حالة بلاغك</h1>
        <p className="text-muted-foreground mt-3">أدخل رقم البلاغ (أو أول 8 أحرف منه) لمتابعة الحالة</p>
      </div>

      <form onSubmit={search} className="glass-strong rounded-sm p-6 flex flex-col sm:flex-row gap-3">
        <div className="flex items-center w-full border border-border rounded-sm bg-white px-3 h-12">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="مثال: a1b2c3d4"
            className="border-0 focus-visible:ring-0 bg-transparent flex-1 text-base"
          />
        </div>
        <Button type="submit" disabled={loading} className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 rounded-sm font-bold px-8">
          {loading ? <Loader2 className="animate-spin" /> : "تتبع"}
        </Button>
      </form>

      {searched && !loading && !result && (
        <div className="mt-8 glass rounded-sm p-8 text-center">
          <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold mb-1">لا توجد نتائج</h3>
          <p className="text-sm text-muted-foreground">تأكد من رقم البلاغ أو <Link to="/report" className="text-accent font-bold hover:underline">قدّم بلاغاً جديداً</Link></p>
        </div>
      )}

      {result && (
        <div className="mt-8 space-y-4">
          <div className="glass-strong rounded-sm overflow-hidden">
            <div className="bg-[oklch(0.62_0.14_80)] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] opacity-80">رقم البلاغ</div>
                <div className="font-mono text-sm">{result.id}</div>
              </div>
              <StatusPill status={result.status} />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-bold navy-text">{result.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{result.ai_summary || result.description}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                {result.location_name && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> {result.location_name}
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  {new Date(result.created_at).toLocaleDateString("ar-AE")}
                </div>
              </div>

              {/* Timeline */}
              <div className="border-t border-border pt-4">
                <div className="text-xs font-bold mb-3 navy-text">مسار البلاغ</div>
                <Timeline status={result.status} createdAt={result.created_at} />
              </div>

              {result.image_url && (
                <img src={result.image_url} alt="" className="w-full rounded-sm border border-border" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { lbl: string; cls: string }> = {
    pending: { lbl: "بانتظار المراجعة", cls: "bg-yellow-100 text-yellow-800" },
    in_progress: { lbl: "قيد المعالجة", cls: "bg-blue-100 text-blue-800" },
    resolved: { lbl: "تم الحل", cls: "bg-green-100 text-green-800" },
  };
  const s = map[status] || map.pending;
  return <span className={`px-3 py-1 rounded-sm text-xs font-bold ${s.cls}`}>{s.lbl}</span>;
}

function Timeline({ status, createdAt }: { status: string; createdAt: string }) {
  const steps = [
    { key: "received", label: "تم استلام البلاغ", icon: FileText, done: true },
    { key: "pending", label: "قيد المراجعة", icon: Clock, done: status !== "pending" || true },
    { key: "in_progress", label: "قيد المعالجة", icon: AlertCircle, done: status === "in_progress" || status === "resolved" },
    { key: "resolved", label: "تم الحل", icon: CheckCircle2, done: status === "resolved" },
  ];
  return (
    <ol className="relative space-y-4">
      {steps.map((s, i) => (
        <li key={s.key} className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.done ? "bg-accent text-white" : "bg-muted text-muted-foreground"}`}>
            <s.icon className="w-4 h-4" />
          </div>
          <div className="flex-1 pb-2">
            <div className={`text-sm font-bold ${s.done ? "navy-text" : "text-muted-foreground"}`}>{s.label}</div>
            {i === 0 && <div className="text-[11px] text-muted-foreground">{new Date(createdAt).toLocaleString("ar-AE")}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
