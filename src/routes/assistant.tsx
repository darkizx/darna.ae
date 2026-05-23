import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useServerFn } from "@tanstack/react-start";
import { chatAI } from "@/lib/ai.functions";
import { Bot, Send, Loader2, Sparkles, User } from "lucide-react";

export const Route = createFileRoute("/assistant")({ component: Assistant });

type Msg = { role: "user" | "assistant"; content: string };

function Assistant() {
  const send = useServerFn(chatAI);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "مرحباً بك في منصة دارنا 👋 أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const el = document.getElementById("chat-end");
    el?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const res = await send({ data: { messages: [...messages, userMsg] } });
      setMessages((m) => [...m, { role: "assistant", content: res.reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "حدث خطأ، حاول مرة أخرى." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 h-[calc(100vh-4rem)] flex flex-col">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-primary" /><span className="gold-text font-bold">Gemini AI</span>
        </div>
        <h1 className="text-3xl font-black"><span className="neon-text">المساعد الذكي</span></h1>
      </div>

      <div className="flex-1 glass-strong rounded-2xl p-6 overflow-y-auto space-y-4 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-secondary" : "gradient-neon-bg"}`}>
              {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-primary-foreground" />}
            </div>
            <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "bg-primary/15 border border-primary/30" : "glass"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="flex gap-3"><div className="w-9 h-9 rounded-lg gradient-neon-bg flex items-center justify-center"><Bot className="w-4 h-4 text-primary-foreground" /></div><div className="glass rounded-2xl p-4"><Loader2 className="w-4 h-4 animate-spin text-primary" /></div></div>}
        <div id="chat-end" />
      </div>

      <form onSubmit={submit} className="flex gap-2">
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="اكتب رسالتك..." className="glass border-primary/30" disabled={loading} />
        <Button type="submit" disabled={loading} className="gradient-neon-bg text-primary-foreground"><Send className="w-4 h-4" /></Button>
      </form>
    </div>
  );
}
