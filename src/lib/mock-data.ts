// lib/mock-data.ts

import { Facility } from "./types";

export const facilities: Facility[] = [
  {
    id: 1,
    name: "Central Sports Complex",
    district: "Downtown",
    address: "123 Main St, City Center",
    latitude: -6.5944,
    longitude: 106.7892,
    description: "Fasilitas olahraga multi-fungsi di pusat kota.",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Olympic Pool",
    district: "North District",
    address: "456 Pool Ave, North Side",
    latitude: -6.58,
    longitude: 106.8,
    description: "Kolam renang standar olimpiade dengan fasilitas lengkap.",
    status: "MAINTENANCE",
  },
];

export const categories = [
  "Lapangan Futsal",
  "Lapangan Basket",
  "Lapangan Badminton",
  "Lapangan Voli",
  "Tennis Court",
];

export const stats = [
  {
    label: "Total Fasilitas",
    value: "12",
    icon: "building-2",
    trend: "+2 bulan ini",
  },
  {
    label: "Total Lapangan",
    value: "45",
    icon: "layout-grid",
    trend: "Tersedia semua",
  },
  {
    label: "Area Jangkauan",
    value: "8 Distrik",
    icon: "map-pin",
    trend: "Bogor & Sekitarnya",
  },
  {
    label: "Kategori Tersedia",
    value: "5",
    icon: "tags",
    trend: "Aktif digunakan",
  },
] as const;