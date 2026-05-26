import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useServerFn } from "@tanstack/react-start";
import { classifyReport } from "@/lib/ai.functions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/report")({ component: ReportPage });

function ReportPage() {
  const navigate = useNavigate();
  const classify = useServerFn(classifyReport);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", reporter_name: "", location_name: "" });
  const [file, setFile] = useState<File | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.description) return toast.error("يرجى تعبئة العنوان والوصف");
    setLoading(true);
    try {
      // upload image
      let image_url: string | null = null;
      if (file) {
        const path = `${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage.from("reports").upload(path, file);
        if (upErr) throw upErr;
        image_url = supabase.storage.from("reports").getPublicUrl(path).data.publicUrl;
      }

      toast.info("🤖 يحلل الذكاء الاصطناعي البلاغ...");
      const ai = await classify({ data: { title: form.title, description: form.description } });

      const { error } = await supabase.from("reports").insert({
        ...form,
        image_url,
        category: ai.category,
        priority: ai.priority,
        sentiment: ai.sentiment,
        ai_summary: ai.ai_summary,
        lat: 25.2 + Math.random() * 0.5,
        lng: 55.0 + Math.random() * 0.8,
      });
      if (error) throw error;
      toast.success("تم استلام البلاغ وتصنيفه ذكياً ✨");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black"><span className="neon-text">رفع بلاغ</span> جديد</h1>
        <p className="text-muted-foreground mt-3">سيقوم الذكاء الاصطناعي بتصنيف بلاغك تلقائياً</p>
      </div>

      <form onSubmit={submit} className="glass-strong rounded-2xl p-8 space-y-5">
        <Field label="العنوان"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="مثال: عطل في الإنارة" /></Field>
        <Field label="الوصف"><Textarea rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="اشرح المشكلة..." /></Field>
        <div className="grid md:grid-cols-2 gap-5">
          <Field label="الموقع"><Input value={form.location_name} onChange={(e) => setForm({ ...form, location_name: e.target.value })} placeholder="دبي - شارع..." /></Field>
          <Field label="الاسم"><Input value={form.reporter_name} onChange={(e) => setForm({ ...form, reporter_name: e.target.value })} placeholder="اختياري" /></Field>
        </div>
        <Field label="صورة (اختياري)">
          <label className="flex items-center gap-3 glass rounded-lg px-4 py-3 cursor-pointer hover:border-primary/50">
            <Upload className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{file ? file.name : "اختر صورة..."}</span>
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
        </Field>
        <Button type="submit" size="lg" disabled={loading} className="w-full gradient-neon-bg text-primary-foreground font-bold animate-pulse-glow">
          {loading ? <Loader2 className="animate-spin" /> : "إرسال البلاغ"}
        </Button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label className="text-sm font-bold">{label}</Label>{children}</div>;
}
