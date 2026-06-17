"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Plus,
  MapPin,
  Building2,
  AlignLeft,
  Map,
  Navigation,
  Phone,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

interface AddFacilityFormProps {
  onSubmit?: (data: any) => void;
  initialData?: any;
  isEditMode?: boolean;
}

export function AddFacilityForm({
  onSubmit,
  initialData,
  isEditMode = false,
}: AddFacilityFormProps) {
  const searchParams = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const address = searchParams.get("address");
  const district = searchParams.get("district");

  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: initialData?.name || "",
      district: initialData?.district || "",
      address: initialData?.address || "",
      description: initialData?.description || "",
      phone: initialData?.phone || "",
      openHours: initialData?.openHours || "",
      latitude: initialData?.latitude || 0,
      longitude: initialData?.longitude || 0,
      thumbnail: null,
    },
  });

  useEffect(() => {
    if (lat && lng) {
      setValue("latitude", parseFloat(lat));
      setValue("longitude", parseFloat(lng));
      setIsOpen(true);
    }

    if (address) {
      setValue("address", decodeURIComponent(address));
    }

    if (district) {
      setValue("district", decodeURIComponent(district));
    }
  }, [lat, lng, address, district, setValue]);

  const onFormSubmit = async (data: any) => {
  const payload = {
    ...data,
    latitude: Number(data.latitude),
    longitude: Number(data.longitude),
  };

  try {
    if (onSubmit) {
      onSubmit(payload);
    } else {
      const response = await fetch("/api/facilities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan fasilitas");
      }

      alert("Fasilitas berhasil ditambahkan");
    }

    reset();
    setIsOpen(false);
  } catch (error) {
    console.error(error);
    alert("Terjadi kesalahan");
  }
};

  const formContent = (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6"
    >
      {/* Nama Fasilitas */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Nama Fasilitas
        </label>

        <Input
          {...register("name", { required: true })}
          placeholder="Contoh: GOR Pajajaran"
        />
      </div>

      {/* Kecamatan */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <Map className="w-4 h-4" />
          Kecamatan
        </label>

        <Input
          {...register("district", { required: true })}
          placeholder="Bogor Tengah"
        />
      </div>

      {/* Alamat */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Alamat Lengkap
        </label>

        <Input
          {...register("address", { required: true })}
          placeholder="Masukkan alamat lengkap"
        />
      </div>

      {/* Latitude & Longitude */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">
            Latitude
          </label>

          <Input
            type="number"
            step="any"
            {...register("latitude", {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase text-slate-500">
            Longitude
          </label>

          <Input
            type="number"
            step="any"
            {...register("longitude", {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      {/* Telepon */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Nomor Telepon
        </label>

        <Input
          {...register("phone")}
          placeholder="08123456789"
        />
      </div>

      {/* Jam Operasional */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Jam Operasional
        </label>

        <Input
          {...register("openHours")}
          placeholder="08.00 - 22.00"
        />
      </div>

      {/* Thumbnail */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Thumbnail Fasilitas
        </label>

        <Input
          type="file"
          accept="image/*"
          {...register("thumbnail")}
        />
      </div>

      {/* Deskripsi */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase text-slate-500 flex items-center gap-2">
          <AlignLeft className="w-4 h-4" />
          Deskripsi
        </label>

        <Textarea
          {...register("description")}
          placeholder="Deskripsi singkat fasilitas olahraga..."
          className="min-h-[120px]"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700"
      >
        {isEditMode
          ? "Simpan Perubahan"
          : "Simpan Fasilitas"}
      </Button>
    </form>
  );

  if (isEditMode) {
    return formContent;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Fasilitas
        </Button>
      </SheetTrigger>

      <SheetContent className="sm:max-w-lg p-0">
        <div className="h-full overflow-y-auto p-8">
          <SheetHeader className="mb-8">
            <SheetTitle>
              Tambah Fasilitas Baru
            </SheetTitle>
          </SheetHeader>

          {formContent}
        </div>
      </SheetContent>
    </Sheet>
  );
}