import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

const SYSTEM = `أنت المساعد الذكي لمنصة "دارنا" البلدية الذكية في الإمارات العربية المتحدة. تساعد المواطنين والمقيمين في:
- تقديم البلاغات عن مشاكل المدينة
- معلومات الخدمات البلدية
- نصائح الاستدامة والذكاء الحضري
أجب باللغة العربية بشكل احترافي ومختصر وودود. استخدم رموز إن أمكن.`;

export const chatAI = createServerFn({ method: "POST" })
  .inputValidator((d: { messages: { role: string; content: string }[] }) => d)
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY missing");
    const r = await fetch(GATEWAY, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM }, ...data.messages],
      }),
    });
    if (!r.ok) {
      if (r.status === 429) return { reply: "تم تجاوز الحد المسموح، حاول لاحقاً.", error: true };
      if (r.status === 402) return { reply: "نفدت الرصيد الذكي للمنصة.", error: true };
      return { reply: "حدث خطأ في المساعد الذكي.", error: true };
    }
    const j = await r.json();
    return { reply: j.choices?.[0]?.message?.content ?? "", error: false };
  });

const ClassifySchema = z.object({ title: z.string().min(1).max(200), description: z.string().min(1).max(2000) });

export const classifyReport = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ClassifySchema.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY missing");

    const tools = [{
      type: "function",
      function: {
        name: "classify",
        description: "تصنيف بلاغ مدني",
        parameters: {
          type: "object",
          properties: {
            category: { type: "string", enum: ["مرور", "نفايات", "إنارة", "مياه", "طرق", "حدائق", "أخرى"] },
            priority: { type: "string", enum: ["low", "medium", "high"] },
            sentiment: { type: "string", enum: ["negative", "neutral", "positive"] },
            ai_summary: { type: "string", description: "ملخص ذكي قصير بالعربية (جملة واحدة)" },
          },
          required: ["category", "priority", "sentiment", "ai_summary"],
          additionalProperties: false,
        },
      },
    }];

    const r = await fetch(GATEWAY, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "أنت مصنّف بلاغات بلدية ذكي. صنّف البلاغ المُقدم." },
          { role: "user", content: `العنوان: ${data.title}\nالوصف: ${data.description}` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "classify" } },
      }),
    });
    if (!r.ok) {
      return { category: "أخرى", priority: "medium", sentiment: "neutral", ai_summary: data.title };
    }
    const j = await r.json();
    const args = j.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    try {
      return JSON.parse(args);
    } catch {
      return { category: "أخرى", priority: "medium", sentiment: "neutral", ai_summary: data.title };
    }
  });

export const aiInsights = createServerFn({ method: "POST" })
  .inputValidator((d: { stats: Record<string, number> }) => d)
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("LOVABLE_API_KEY missing");
    const r = await fetch(GATEWAY, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "أنت محلل بيانات بلدي. قدم 3 توصيات تنبؤية ذكية موجزة (سطر لكل واحدة) بناءً على إحصائيات البلاغات." },
          { role: "user", content: `الإحصائيات: ${JSON.stringify(data.stats)}` },
        ],
      }),
    });
    if (!r.ok) return { insights: "لا تتوفر تحليلات حالياً." };
    const j = await r.json();
    return { insights: j.choices?.[0]?.message?.content ?? "" };
  });
