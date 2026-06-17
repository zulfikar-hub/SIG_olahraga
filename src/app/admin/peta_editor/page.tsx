"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save, Crosshair, MapPin } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix icon default Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
import { useMapEvents } from "react-leaflet";

function MapClickHandler({ setLat, setLng, setMarker, setAddress, setDistrict }: any) {
  useMapEvents({
    // Di dalam MapClickHandler
async click(e: any) {
  const { lat, lng } = e.latlng;
  setLat(lat.toFixed(6));
  setLng(lng.toFixed(6));
  setMarker(e.latlng);

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    const data = await res.json();
    
    // Ambil alamat lengkap
    setAddress(data.display_name || "");
    
    // Ambil kecamatan (Nominatim sering menggunakan 'town', 'city_district', atau 'suburb')
    const kecamatan = data.address.suburb || data.address.town || data.address.city_district || "";
    
    // Kirim kecamatan ke state baru (tambahkan state setDistrict di props)
    setDistrict(kecamatan); 
  } catch (err) {
    console.error("Gagal mengambil data lokasi");
  }
},
  });
  return null;
}

const BOGOR_BOUNDS: [[number, number], [number, number]] = [
  [-6.666, 106.735],
  [-6.515, 106.855],
];

export default function PetaEditorPage() {
  const [lat, setLat] = useState<string>("");
  const [lng, setLng] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [marker, setMarker] = useState<any>(null);
  const router = useRouter();

  const handleSave = () => {
  router.push(
    `/admin/fasilitas_olahraga?lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}&district=${encodeURIComponent(district)}`
  );
};

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Peta Editor Spasial</h1>
          <p className="text-slate-600 mt-1">Klik peta untuk mengambil koordinat dan alamat otomatis.</p>
        </div>
        <Button onClick={handleSave} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={!marker}>
          <Save size={20} /> Simpan & Lanjut ke Form
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
          <Card className="h-[600px] relative overflow-hidden border-2 border-slate-200 shadow-sm">
            <MapContainer center={[-6.5944, 106.7892]} zoom={13} maxBounds={BOGOR_BOUNDS} className="h-full w-full">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapClickHandler setLat={setLat} setLng={setLng} setMarker={setMarker} setAddress={setAddress} />
              {marker && <Marker position={marker} />}
            </MapContainer>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase">Data Lokasi</h2>
            <div>
              <label className="text-xs font-semibold text-slate-500">Latitude</label>
              <input readOnly value={lat} className="w-full bg-slate-100 p-2 rounded text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Longitude</label>
              <input readOnly value={lng} className="w-full bg-slate-100 p-2 rounded text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-500">Alamat Terdeteksi</label>
              <textarea readOnly value={address} className="w-full bg-slate-50 border p-2 rounded text-xs h-20" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}