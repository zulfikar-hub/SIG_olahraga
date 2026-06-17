"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  Trophy,
  Tags,
  Images,
} from "lucide-react";

import { Card } from "@/components/ui/card";

interface DashboardStats {
  facilities: number;
  fields: number;
  categories: number;
  images: number;
}

export function StatsCards() {
  const [stats, setStats] =
    useState<DashboardStats>({
      facilities: 0,
      fields: 0,
      categories: 0,
      images: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch(
        "/api/dashboard"
      );

      const data =
        await response.json();

      setStats(data);
    } catch (error) {
      console.error(
        "Gagal mengambil statistik",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      label: "Total Fasilitas",
      value: stats.facilities,
      icon: Building2,
      color:
        "bg-blue-50 text-blue-600",
      description:
        "Lokasi olahraga terdaftar",
    },
    {
      label: "Total Lapangan",
      value: stats.fields,
      icon: Trophy,
      color:
        "bg-emerald-50 text-emerald-600",
      description:
        "Lapangan aktif",
    },
    {
      label: "Total Kategori",
      value: stats.categories,
      icon: Tags,
      color:
        "bg-purple-50 text-purple-600",
      description:
        "Kategori olahraga",
    },
    {
      label: "Total Galeri",
      value: stats.images,
      icon: Images,
      color:
        "bg-orange-50 text-orange-600",
      description:
        "Foto fasilitas",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(
          (item) => (
            <Card
              key={item}
              className="p-6 border bg-white animate-pulse"
            >
              <div className="h-4 bg-slate-200 rounded w-24 mb-3" />
              <div className="h-8 bg-slate-200 rounded w-16 mb-2" />
              <div className="h-3 bg-slate-200 rounded w-32" />
            </Card>
          )
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.label}
            className="p-6 border bg-white hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-slate-500">
                  {card.label}
                </p>

                <p className="text-3xl font-bold mt-1 text-slate-900">
                  {card.value}
                </p>

                <p className="text-xs text-slate-500 mt-2">
                  {card.description}
                </p>
              </div>

              <div
                className={`p-3 rounded-xl ${card.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}