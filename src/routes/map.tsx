import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listReports } from "@/lib/reports.functions";
import { SmartMap } from "@/components/SmartMap";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/map")({
  component: MapPage,
  head: () => ({
    meta: [
      { title: "الخريطة التفاعلية — دارنا" },
      { name: "description", content: "خريطة موحّدة لجميع البلاغات البلدية في الإمارات السبع." },
      { property: "og:title", content: "خريطة بلاغات الإمارات — دارنا" },
      { property: "og:description", content: "عرض مكاني لحظي للبلاغات البلدية." },
    ],
  }),
});

function MapPage() {
  const fn = useServerFn(listReports);
  const { data, isLoading } = useQuery({ queryKey: ["reports"], queryFn: () => fn() });

  const points = (data ?? []).filter((r) => r.lat && r.lng).map((r) => ({
    id: r.id, lat: r.lat!, lng: r.lng!, title: r.title, location_name: r.location_name, status: r.status,
  }));

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-6">
        <h1 className="text-4xl font-black"><span className="neon-text">خريطة الإمارات</span> الذكية</h1>
        <p className="text-muted-foreground mt-2">عرض مباشر لجميع البلاغات على خريطة OpenStreetMap</p>
      </div>
      {isLoading ? (
        <div className="h-[500px] glass rounded-2xl flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>
      ) : (
        <SmartMap points={points} height="70vh" />
      )}
      <div className="mt-4 text-sm text-muted-foreground text-center">
        {points.length} نقطة بلاغ نشطة عبر دولة الإمارات
      </div>
    </div>
  );
}
