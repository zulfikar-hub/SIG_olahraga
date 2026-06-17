"use client";

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Image as ImageIcon,
  Edit2,
  Activity,
  Trash2,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddFacilityForm } from "@/components/admin/facilityform";
import  GaleryForm  from "@/components/admin/galeryform";

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  description?: string;
  latitude: number;
  longitude: number;
  status: string;
  fields?: any[];
  images?: any[];
}

export default function FasilitasOlahragaPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const loadFacilities = async () => {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();

setFacilities(Array.isArray(data) ? data : []);    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFacilities();
  }, []);

  const handleEdit = (facility: any) => {
  setSelectedFacility(facility);
  setIsEditOpen(true);
};

const handleUpdateFacility = async (data: any) => {
  try {
    const response = await fetch(
      `/api/facilities/${selectedFacility.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Gagal update fasilitas");
    }

    const updatedFacility = await response.json();

    setFacilities((prev) =>
      prev.map((item) =>
        item.id === updatedFacility.id
          ? updatedFacility
          : item
      )
    );

    setIsEditOpen(false);
    setSelectedFacility(null);

    alert("Fasilitas berhasil diperbarui");
  } catch (error) {
    console.error(error);
    alert("Gagal update fasilitas");
  }
};

const handleDeleteFacility = async (
  id: number
) => {
  const confirmDelete = confirm(
    "Yakin ingin menghapus fasilitas ini?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `/api/facilities/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(
        "Gagal menghapus fasilitas"
      );
    }

    setFacilities((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    alert(
      "Fasilitas berhasil dihapus"
    );
  } catch (error) {
    console.error(error);

    alert(
      "Gagal menghapus fasilitas"
    );
  }
};



  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Manajemen Fasilitas
          </h1>

          <p className="text-slate-500">
            Kelola fasilitas olahraga Kota Bogor.
          </p>
        </div>

        <AddFacilityForm />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    {facility.name}
                  </h2>

                  <p className="text-slate-500 mt-2">
                    {facility.address}
                  </p>

                  <p className="text-sm text-slate-400">
                    Kecamatan {facility.district}
                  </p>
                </div>

                <div className="flex gap-2">
                 <button
  onClick={() => {
    setSelectedFacility(facility);
    setIsGalleryOpen(true);
  }}
  className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2"
>
  <ImageIcon className="w-4 h-4" />
  Kelola Galeri
</button>

                  <button
  onClick={() => handleEdit(facility)}
  className="px-4 py-2 bg-white border rounded-lg shadow-sm hover:bg-slate-50 flex items-center gap-2"
>
  <Edit2 className="w-4 h-4" />
  Edit Info
</button>
<button
  onClick={() =>
    handleDeleteFacility(
      facility.id
    )
  }
  className="px-4 py-2 bg-red-50 border border-red-200 rounded-lg shadow-sm hover:bg-red-100 flex items-center gap-2 text-red-600"
>
  <Trash2 className="w-4 h-4" />
  Hapus
</button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-4 border">
                  <p className="text-sm text-slate-500">
                    Jumlah Lapangan
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <Activity className="w-5 h-5 text-emerald-600" />

                    <span className="text-2xl font-bold">
                      {facility.fields?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border">
                  <p className="text-sm text-slate-500">
                    Jumlah Foto
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <ImageIcon className="w-5 h-5 text-blue-600" />

                    <span className="text-2xl font-bold">
                      {facility.images?.length || 0}
                    </span>
                  </div>
                </div>
              </div>

              <Sheet
  open={isEditOpen}
  onOpenChange={setIsEditOpen}
>
<SheetContent className="sm:max-w-lg w-full h-full overflow-y-auto px-6">
  <SheetHeader>
    <SheetTitle>Edit Fasilitas</SheetTitle>
  </SheetHeader>

  {selectedFacility && (
    <div className="mt-6 pb-10">
      <AddFacilityForm
        isEditMode
        initialData={selectedFacility}
        onSubmit={handleUpdateFacility}
      />
    </div>
  )}
</SheetContent>
</Sheet>

<Sheet
  open={isGalleryOpen}
  onOpenChange={setIsGalleryOpen}
>
  <SheetContent className="sm:max-w-lg w-full h-full overflow-y-auto px-6">
    <SheetHeader>
      <SheetTitle>Kelola Galeri</SheetTitle>
    </SheetHeader>

    {selectedFacility && (
      <GaleryForm
        facilityId={selectedFacility.id}
      />
    )}
  </SheetContent>
</Sheet>
            </div> 
          ))}
        </div>
        
      )}
      
    </div>
  );
}