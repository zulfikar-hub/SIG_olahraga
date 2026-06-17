"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Facility {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface FieldFormProps {
  onSubmit: (data: any) => void;
  facilities?: Facility[];
  categories?: Category[];
  initialData?: any;
}

export function FieldForm({
  onSubmit,
  facilities = [],
  categories = [],
  initialData,
}: FieldFormProps) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      facilityId: "",
      categoryId: "",
      name: "",
      price: "",
      status: "AVAILABLE",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        facilityId:
          String(
            initialData.facilityId
          ) || "",
        categoryId:
          String(
            initialData.categoryId
          ) || "",
        name:
          initialData.name || "",
        price:
          String(
            initialData.price
          ) || "",
        status:
          initialData.status ||
          "AVAILABLE",
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-6 px-6"
    >
      <div className="space-y-4">
        <h3 className="font-bold text-sm text-slate-900">
          Informasi Lapangan
        </h3>

        {/* Nama */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Nama Lapangan
          </label>

          <Input
            {...register("name", {
              required: true,
            })}
            placeholder="Lapangan Futsal A"
          />
        </div>

        {/* Fasilitas */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Fasilitas
          </label>

          <select
            {...register(
              "facilityId",
              {
                required: true,
              }
            )}
            className="w-full h-11 border rounded-md px-3 bg-white"
          >
            <option value="">
              Pilih Fasilitas
            </option>

            {facilities.map(
              (facility) => (
                <option
                  key={
                    facility.id
                  }
                  value={
                    facility.id
                  }
                >
                  {facility.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Kategori */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Kategori
          </label>

          <select
            {...register(
              "categoryId",
              {
                required: true,
              }
            )}
            className="w-full h-11 border rounded-md px-3 bg-white"
          >
            <option value="">
              Pilih Kategori
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* Harga */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Harga
          </label>

          <Input
            type="number"
            {...register(
              "price",
              {
                required: true,
              }
            )}
            placeholder="150000"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Status
          </label>

          <select
            {...register(
              "status"
            )}
            className="w-full h-11 border rounded-md px-3 bg-white"
          >
            <option value="AVAILABLE">
              Tersedia
            </option>

            <option value="MAINTENANCE">
              Maintenance
            </option>

            <option value="CLOSED">
              Tutup
            </option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-emerald-600 hover:bg-emerald-700"
      >
        {initialData
          ? "Update Lapangan"
          : "Simpan Lapangan"}
      </Button>
    </form>
  );
}