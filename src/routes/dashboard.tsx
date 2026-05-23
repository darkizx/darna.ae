import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listReports } from "@/lib/reports.functions";
import { aiInsights } from "@/lib/ai.functions";
import { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { Activity, AlertCircle, CheckCircle2, Clock, Sparkles, Loader2 } from "lucide-react";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const COLORS = ["#00B4FF", "#FFD66B", "#FF6B9D", "#7C5CFF", "#34E0A1"];

function Dashboard() {
  const fn = useServerFn(listReports);
  const insightsFn = useServerFn(aiInsights);
  const { data: reports = [], isLoading } = useQuery({ queryKey: ["reports"], queryFn: () => fn() });
  const [insights, setInsights] = useState("");
  const [insightsLoading, setInsightsLoading] = useState(false);

  const stats = useMemo(() => {
    const byCat: Record<string, number> = {};
    const byStatus: Record<string, number> = { pending: 0, in_progress: 0, resolved: 0 };
    let high = 0;
    reports.forEach((r) => {
      if (r.category) byCat[r.category] = (byCat[r.category] || 0) + 1;
      if (r.status) byStatus[r.status] = (byStatus[r.status] || 0) + 1;
      if (r.priority === "high") high++;
    });
    return { byCat, byStatus, high, total: reports.length };
  }, [reports]);

  useEffect(() => {
    if (reports.length === 0) return;
    setInsightsLoading(true);
    insightsFn({ data: { stats: { ...stats.byCat, high_priority: stats.high, total: stats.total } } })
      .then((r) => setInsights(r.insights))
      .finally(() => setInsightsLoading(false));
  }, [reports.length]); // eslint-disable-line

  if (isLoading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>;

  const catData = Object.entries(stats.byCat).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(stats.byStatus).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-6">
      <div>
        <h1 className="text-4xl font-black"><span className="neon-text">لوحة التحكم</span> البلدية</h1>
        <p className="text-muted-foreground mt-2">مراقبة حية وتحليلات ذكية</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI icon={Activity} label="إجمالي البلاغات" value={stats.total} color="text-primary" />
        <KPI icon={AlertCircle} label="أولوية عالية" value={stats.high} color="text-destructive" />
        <KPI icon={Clock} label="قيد المعالجة" value={stats.byStatus.in_progress} color="gold-text" />
        <KPI icon={CheckCircle2} label="تم الحل" value={stats.byStatus.resolved} color="text-primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 glass-strong rounded-2xl p-6">
          <h3 className="font-bold mb-4">البلاغات حسب الفئة</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={catData}>
              <XAxis dataKey="name" stroke="oklch(0.72 0.04 240)" />
              <YAxis stroke="oklch(0.72 0.04 240)" />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.06 260)", border: "1px solid oklch(0.75 0.18 230 / 0.4)", borderRadius: 8 }} />
              <Bar dataKey="value" fill="#00B4FF" radius={[8, 8, 0, 0]} />
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
              <Tooltip contentStyle={{ background: "oklch(0.22 0.06 260)", border: "1px solid oklch(0.75 0.18 230 / 0.4)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="glass-strong rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute -top-10 -end-10 w-40 h-40 rounded-full gradient-neon-bg opacity-20 blur-3xl" />
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-bold">رؤى الذكاء الاصطناعي التنبؤية</h3>
          <span className="text-xs gold-text">· Gemini</span>
        </div>
        {insightsLoading ? <Loader2 className="animate-spin text-primary" /> :
          <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">{insights || "—"}</div>}
      </div>

      {/* Reports table */}
      <div className="glass-strong rounded-2xl p-6">
        <h3 className="font-bold mb-4">البلاغات النشطة</h3>
        <div className="space-y-3">
          {reports.slice(0, 10).map((r) => (
            <div key={r.id} className="glass rounded-xl p-4 flex items-center justify-between gap-4 hover:border-primary/40 transition-all">
              <div className="flex-1 min-w-0">
                <div className="font-bold">{r.title}</div>
                <div className="text-xs text-muted-foreground truncate">{r.ai_summary || r.description}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{r.location_name}</div>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs shrink-0">
                {r.category && <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary">{r.category}</span>}
                <PriorityBadge p={r.priority} />
                <StatusBadge s={r.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
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

function PriorityBadge({ p }: { p: string | null }) {
  if (!p) return null;
  const map: Record<string, string> = { high: "bg-destructive/20 text-destructive", medium: "bg-yellow-500/20 text-yellow-400", low: "bg-green-500/20 text-green-400" };
  const lbl: Record<string, string> = { high: "عالية", medium: "متوسطة", low: "منخفضة" };
  return <span className={`px-2 py-0.5 rounded-full ${map[p] || ""}`}>{lbl[p] || p}</span>;
}
function StatusBadge({ s }: { s: string | null }) {
  const lbl: Record<string, string> = { pending: "بانتظار", in_progress: "قيد المعالجة", resolved: "تم الحل" };
  return <span className="px-2 py-0.5 rounded-full bg-secondary/60">{lbl[s ?? ""] || s}</span>;
}
