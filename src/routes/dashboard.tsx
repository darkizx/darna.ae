import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listReports } from "@/lib/reports.functions";
import { aiInsights } from "@/lib/ai.functions";
import { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Activity, AlertCircle, CheckCircle2, Clock, Loader2, Download, Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "لوحة التحكم — دارنا" },
      { name: "description", content: "لوحة تحكم البلديات الذكية مع تحليلات حية وفلاتر متقدمة وتصدير التقارير." },
      { property: "og:title", content: "لوحة التحكم — دارنا" },
      { property: "og:description", content: "مراقبة حية وتحليلات ذكية للبلاغات البلدية." },
    ],
  }),
});

const COLORS = ["#EF3340", "#00732F", "#B8860B", "#1F2A44", "#6B7280"];

function Dashboard() {
  const fn = useServerFn(listReports);
  const insightsFn = useServerFn(aiInsights);
  const { data: allReports = [], isLoading } = useQuery({ queryKey: ["reports"], queryFn: () => fn() });
  const [insights, setInsights] = useState("");
  const [insightsLoading, setInsightsLoading] = useState(false);

  // Filters
  const [fStatus, setFStatus] = useState<string>("all");
  const [fCategory, setFCategory] = useState<string>("all");
  const [fPriority, setFPriority] = useState<string>("all");
  const [fSearch, setFSearch] = useState<string>("");

  const categories = useMemo(() => Array.from(new Set(allReports.map((r: any) => r.category).filter(Boolean))), [allReports]);

  const reports = useMemo(() => {
    return allReports.filter((r: any) => {
      if (fStatus !== "all" && r.status !== fStatus) return false;
      if (fCategory !== "all" && r.category !== fCategory) return false;
      if (fPriority !== "all" && r.priority !== fPriority) return false;
      if (fSearch) {
        const q = fSearch.toLowerCase();
        const hay = `${r.title} ${r.description} ${r.location_name ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allReports, fStatus, fCategory, fPriority, fSearch]);

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    const byStatus: Record<string, number> = { pending: 0, in_progress: 0, resolved: 0 };
    let high = 0;
    reports.forEach((r: any) => {
      if (r.category) byCat[r.category] = (byCat[r.category] || 0) + 1;
      if (r.status) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      if (r.priority === "high") high++;
    });
    return { byCat, byStatus, high, total: reports.length };
  }, [reports]);

  useEffect(() => {
    if (allReports.length === 0) return;
    setInsightsLoading(true);
    insightsFn({ data: { stats: { ...stats.byCat, high_priority: stats.high, total: stats.total } } })
      .then((r) => setInsights(r.insights))
      .finally(() => setInsightsLoading(false));
  }, [allReports.length]); // eslint-disable-line

  function exportCSV() {
    const rows = [
      ["ID", "Title", "Category", "Priority", "Status", "Location", "Created"],
      ...reports.map((r: any) => [
        r.id,
        r.title?.replace(/"/g, '""') ?? "",
        r.category ?? "",
        r.priority ?? "",
        r.status ?? "",
        (r.location_name ?? "").replace(/"/g, '""'),
        r.created_at,
      ]),
    ];
    const csv = "\uFEFF" + rows.map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `darna-reports-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  const catData = Object.entries(stats.byCat).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black"><span className="neon-text">لوحة التحكم</span> البلدية</h1>
          <p className="text-muted-foreground mt-2">مراقبة حية وتحليلات ذكية</p>
        </div>
        <Button onClick={exportCSV} variant="outline" className="rounded-sm">
          <Download className="ms-2 w-4 h-4" /> تصدير CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="glass rounded-sm p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <Filter className="w-4 h-4" /> فلاتر:
        </div>
        <Input
          placeholder="بحث في البلاغات..."
          value={fSearch}
          onChange={(e) => setFSearch(e.target.value)}
          className="w-full sm:w-56 h-9 rounded-sm bg-white"
        />
        <Select value={fStatus} onChange={setFStatus} options={[
          { v: "all", l: "كل الحالات" },
          { v: "pending", l: "بانتظار" },
          { v: "in_progress", l: "قيد المعالجة" },
          { v: "resolved", l: "تم الحل" },
        ]} />
        <Select value={fPriority} onChange={setFPriority} options={[
          { v: "all", l: "كل الأولويات" },
          { v: "high", l: "عالية" },
          { v: "medium", l: "متوسطة" },
          { v: "low", l: "منخفضة" },
        ]} />
        <Select value={fCategory} onChange={setFCategory} options={[
          { v: "all", l: "كل الفئات" },
          ...categories.map((c: any) => ({ v: c, l: c })),
        ]} />
        <div className="ms-auto text-xs text-muted-foreground">
          {reports.length} / {allReports.length} بلاغ
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI icon={Activity} label="إجمالي البلاغات" value={stats.total} color="text-primary" />
        <KPI icon={AlertCircle} label="أولوية عالية" value={stats.high} color="text-destructive" />
        <KPI icon={Clock} label="قيد المعالجة" value={stats.byStatus.in_progress} color="gold-text" />
        <KPI icon={CheckCircle2} label="تم الحل" value={stats.byStatus.resolved} color="text-primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
          <h3 className="font-bold mb-4">البلاغات حسب الفئة</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={catData}>
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 8, color: "#1F2A44" }} />
              <Bar dataKey="value" fill="#EF3340" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-strong rounded-2xl p-6">
          <h3 className="font-bold mb-4">حالة البلاغات</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #E5E7EB", borderRadius: 8, color: "#1F2A44" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-10 -end-10 w-40 h-40 rounded-full gradient-neon-bg opacity-20 blur-3xl" />
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-bold text-lg">رؤى الذكاء الاصطناعي التنبؤية</h3>
          <span className="text-xs gold-text">· تحليلات ذكية</span>
        </div>
        {insightsLoading ? <Loader2 className="animate-spin text-primary" /> : <InsightsList raw={insights} />}
      </div>

      {/* Recent reports timeline */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="font-bold mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-accent" /> الجدول الزمني للبلاغات</h3>
        {reports.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-8">لا توجد بلاغات تطابق الفلاتر</div>
        ) : (
          <ol className="relative space-y-4 ps-6 border-s-2 border-border">
            {reports.slice(0, 12).map((r: any) => (
              <li key={r.id} className="relative">
                <span className={`absolute -start-[1.85rem] top-2 w-4 h-4 rounded-full border-2 border-white shadow ${priorityDot(r.priority)}`} />
                <div className="glass rounded-xl p-4 flex flex-wrap items-start justify-between gap-3 hover:border-accent/40 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-bold">{r.title}</div>
                      <span className="text-[10px] font-mono text-muted-foreground">#{r.id.slice(0, 8)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{r.ai_summary || r.description}</div>
                    <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-2">
                      <span>{r.location_name}</span>
                      <span>·</span>
                      <span>{new Date(r.created_at).toLocaleString("ar-AE", { dateStyle: "medium", timeStyle: "short" })}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-xs shrink-0">
                    {r.category && <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent">{r.category}</span>}
                    <PriorityBadge p={r.priority} />
                    <StatusBadge s={r.status} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { v: string; l: string }[] }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-sm bg-white border border-border px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent/30"
    >
      {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function KPI({ icon: Icon, label, value, color }: { icon: any; label: string; value: number; color: string }) {
  return (
    <div className="glass rounded-2xl p-5 hover:neon-border transition-all">
      <Icon className={`w-5 h-5 ${color} mb-3`} />
      <div className={`text-3xl font-black ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function InsightsList({ raw }: { raw: string }) {
  if (!raw) return <div className="text-sm text-muted-foreground">—</div>;
  const lines = raw
    .split("\n")
    .map((l) => l.replace(/^[\s*\-•]+/, "").replace(/\*\*/g, "").trim())
    .filter(Boolean);
  return (
    <ol className="space-y-3">
      {lines.map((line, i) => {
        const [head, ...rest] = line.split(":");
        const hasTitle = rest.length > 0;
        return (
          <li key={i} className="flex gap-3 items-start glass rounded-xl p-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
            <div className="text-sm leading-relaxed text-foreground/90 flex-1">
              {hasTitle ? (
                <>
                  <span className="font-bold gold-text">{head.trim()}</span>
                  <span className="text-foreground/80">{": " + rest.join(":").trim()}</span>
                </>
              ) : line}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function priorityDot(p: string | null) {
  if (p === "high") return "bg-destructive";
  if (p === "medium") return "bg-yellow-500";
  if (p === "low") return "bg-green-500";
  return "bg-muted";
}

function PriorityBadge({ p }: { p: string | null }) {
  if (!p) return null;
  const map: Record<string, string> = { high: "bg-destructive/20 text-destructive", medium: "bg-yellow-500/20 text-yellow-700", low: "bg-green-500/20 text-green-700" };
  const lbl: Record<string, string> = { high: "عالية", medium: "متوسطة", low: "منخفضة" };
  return <span className={`px-2 py-0.5 rounded-full ${map[p] || ""}`}>{lbl[p] || p}</span>;
}
function StatusBadge({ s }: { s: string | null }) {
  const lbl: Record<string, string> = { pending: "بانتظار", in_progress: "قيد المعالجة", resolved: "تم الحل" };
  return <span className="px-2 py-0.5 rounded-full bg-secondary/60">{lbl[s ?? ""] || s}</span>;
}
