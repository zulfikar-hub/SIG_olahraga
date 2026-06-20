"use client";

import React, { useEffect, useState } from "react";
import {
  Search,
  Edit3,
  Trash2,
  Plus,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { FieldForm } from "@/components/admin/feildform";

export default function DataLapanganPage() {
  const [fields, setFields] = useState<any[]>([]);
  const [facilities, setFacilities] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingField, setEditingField] = useState<any>(null);

  // =========================
  // LOAD DATA
  // =========================

  const loadFields = async () => {
    try {
      const response = await fetch("/api/lapangan");
      const data = await response.json();

      setFields(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadFacilities = async () => {
    try {
      const response = await fetch("/api/facilities");
      const data = await response.json();

      setFacilities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        loadFields(),
        loadFacilities(),
        loadCategories(),
      ]);

      setLoading(false);
    };

    init();
  }, []);

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSaveField = async (data: any) => {
    try {
      const response = await fetch("/api/lapangan", {
        method: editingField ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: editingField?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menyimpan");
      }

      await loadFields();

      setEditingField(null);
      setIsSheetOpen(false);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan lapangan");
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus lapangan?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch("/api/lapangan", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus");
      }

      await loadFields();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus lapangan");
    }
  };

  // =========================
  // EDIT
  // =========================

  const handleEdit = (field: any) => {
    setEditingField(field);
    setIsSheetOpen(true);
  };

  const filteredFields = fields.filter((field) => {
  const keyword = search.toLowerCase();

  return (
    field.name.toLowerCase().includes(keyword) ||
    field.facility?.name.toLowerCase().includes(keyword) ||
    field.category?.name.toLowerCase().includes(keyword)
  );
});

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Data Lapangan
          </h1>

          <p className="text-sm text-zinc-500">
            Kelola lapangan pada setiap fasilitas olahraga.
          </p>
        </div>

        <Sheet
          open={isSheetOpen}
          onOpenChange={setIsSheetOpen}
        >
          <SheetTrigger asChild>
            <button
              onClick={() =>
                setEditingField(null)
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Lapangan
            </button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle>
                {editingField
                  ? "Edit Lapangan"
                  : "Tambah Lapangan"}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6">
              <FieldForm
                facilities={facilities}
                categories={categories}
                initialData={editingField}
                onSubmit={handleSaveField}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
  type="text"
  placeholder="Cari lapangan..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full pl-10 py-2 border rounded-lg"
/>
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center">
            Memuat data...
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-zinc-50 text-xs uppercase text-zinc-500">
              <tr>
                <th className="p-4">Nama Lapangan</th>
                <th className="p-4">Fasilitas</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
  {filteredFields.map((field) => (                <tr
                  key={field.id}
                  className="border-t"
                >
                  <td className="p-4 font-medium">
                    {field.name}
                  </td>

                  <td className="p-4">
                    {field.facility?.name ??
                      "-"}
                  </td>

                  <td className="p-4">
                    {field.category?.name ??
                      "-"}
                  </td>

                  <td className="p-4 font-semibold text-emerald-700">
                    Rp{" "}
                    {Number(
                      field.price
                    ).toLocaleString("id-ID")}
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">
                      {field.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          handleEdit(field)
                        }
                        className="p-2 rounded-lg hover:bg-emerald-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            field.id
                          )
                        }
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading &&
  filteredFields.length === 0 && (
    <div className="text-center py-12 text-zinc-500">
      Tidak ditemukan data lapangan.
    </div>
)}
      </div>
    </div>
  );
}