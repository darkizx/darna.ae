import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.divIcon({
  className: "",
  html: `<div style="width:18px;height:18px;border-radius:50%;background:oklch(0.78 0.20 220);box-shadow:0 0 12px oklch(0.78 0.20 220 / 0.9), 0 0 24px oklch(0.78 0.20 220 / 0.5);border:2px solid white"></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export type MapPoint = { id: string; lat: number; lng: number; title: string; location_name?: string | null; status?: string | null };

export function SmartMap({ points, height = "500px" }: { points: MapPoint[]; height?: string }) {
  return (
    <div className="rounded-2xl overflow-hidden neon-border" style={{ height }}>
      <MapContainer center={[24.8, 55.0]} zoom={7} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {points.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={icon}>
            <Popup>
              <div className="font-bold text-primary">{p.title}</div>
              <div className="text-xs opacity-70">{p.location_name}</div>
              {p.status && <div className="text-xs mt-1">الحالة: {p.status}</div>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
