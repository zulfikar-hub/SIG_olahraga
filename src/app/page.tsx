"use client";

import { useEffect, useState } from "react";

import { Navbar } from "@/components/navbar";
import { SidebarFilter } from "@/components/sidebar-filter";
import { MapContainer } from "@/components/map-container";
import { InfoCard } from "@/components/info-card";

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  latitude: number;
  longitude: number;
  description?: string;
  phone?: string;
  openHours?: string;
  thumbnail?: string;
  status: string;

  fields: any[];
  images: any[];
}

export default function Page() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedFacility, setSelectedFacility] =
    useState<Facility | null>(null);

  const [infoCardOpen, setInfoCardOpen] =
    useState(false);

  const [facilities, setFacilities] =
    useState<Facility[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFacilities();
  }, []);

  const loadFacilities = async () => {
    try {
      const response = await fetch(
        "/api/facilities"
      );

      const data = await response.json();

      setFacilities(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (
    marker: any
  ) => {
    const facility = facilities.find(
      (item) => item.id === marker.id
    );

    if (facility) {
      setSelectedFacility(facility);
      setInfoCardOpen(true);
    }
  };

  const handleCategoryChange = (
    categories: string[]
  ) => {
    setSelectedCategories(categories);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-500">
        Memuat data...
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-slate-50 dark:bg-slate-900">
      <Navbar
        onToggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
        onSearch={setSearchQuery}
      />

      <SidebarFilter
        isOpen={sidebarOpen}
        onToggle={() =>
          setSidebarOpen(!sidebarOpen)
        }
        onCategoryChange={
          handleCategoryChange
        }
      />

      <div className="pt-16 h-screen overflow-hidden">
        <MapContainer
          facilities={facilities}
          selectedCategories={
            selectedCategories
          }
          searchQuery={searchQuery}
          onMarkerClick={
            handleMarkerClick
          }
        />
      </div>

      <InfoCard
        facility={selectedFacility}
        isOpen={infoCardOpen}
        onClose={() => {
          setInfoCardOpen(false);
          setSelectedFacility(null);
        }}
      />
    </main>
  );
}