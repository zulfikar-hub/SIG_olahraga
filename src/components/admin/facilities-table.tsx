"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  status: "ACTIVE" | "MAINTENANCE" | "INACTIVE";
  fields?: any[];
  images?: any[];
}

export function FacilitiesTable() {
  const [items, setItems] = useState<
    Facility[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const loadFacilities =
    async () => {
      try {
        const response =
          await fetch(
            "/api/facilities"
          );

        const data =
          await response.json();

        setItems(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(
          "Gagal mengambil fasilitas",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadFacilities();
  }, []);

  const getStatusColor = (
    status:
      | "ACTIVE"
      | "MAINTENANCE"
      | "INACTIVE"
  ) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border border-emerald-100";

      case "MAINTENANCE":
        return "bg-yellow-50 text-yellow-700 border border-yellow-100";

      case "INACTIVE":
        return "bg-red-50 text-red-700 border border-red-100";

      default:
        return "bg-slate-50 text-slate-700 border border-slate-100";
    }
  };

  if (loading) {
    return (
      <Card className="border-slate-200 bg-white">
        <div className="p-10 text-center text-slate-500">
          Memuat data fasilitas...
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-slate-900">
          Fasilitas Terbaru
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Daftar fasilitas olahraga yang
          tersedia dalam sistem.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Nama Fasilitas
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Kecamatan
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Alamat
              </th>

              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Lapangan
              </th>

              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Galeri
              </th>

              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {items.map(
              (facility) => (
                <tr
                  key={
                    facility.id
                  }
                  className="border-b hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />

                      <span className="font-medium text-slate-900">
                        {
                          facility.name
                        }
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {
                      facility.district
                    }
                  </td>

                  <td className="px-6 py-4 text-slate-600 max-w-sm truncate">
                    {
                      facility.address
                    }
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {facility
                        .fields
                        ?.length ||
                        0}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
                      {facility
                        .images
                        ?.length ||
                        0}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        facility.status
                      )}`}
                    >
                      {
                        facility.status
                      }
                    </span>
                  </td>
                </tr>
              )
            )}

            {items.length ===
              0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-500"
                >
                  Belum ada fasilitas
                  olahraga.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}