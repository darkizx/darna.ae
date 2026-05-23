import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "دارنا — منصة البلدية الذكية | UAE Smart Municipality" },
      { name: "description", content: "منصة البلدية الذكية للإمارات العربية المتحدة، مدعومة بالذكاء الاصطناعي Gemini." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: ({ children }: { children: React.ReactNode }) => (
    <html lang="ar" dir="rtl">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  ),
  component: RootComponent,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center"><h1 className="text-6xl font-black neon-text">404</h1><p className="mt-4 text-muted-foreground">الصفحة غير موجودة</p></div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass rounded-2xl p-8 max-w-md text-center"><h1 className="text-xl font-bold mb-2">حدث خطأ</h1><p className="text-sm text-muted-foreground">{error.message}</p></div>
    </div>
  ),
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}
