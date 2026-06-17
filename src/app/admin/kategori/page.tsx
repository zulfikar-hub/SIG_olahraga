"use client";

import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  AlertCircle,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  _count?: {
    fields: number;
  };
}

const SPORT_ICONS = [
  "⚽",
  "🏀",
  "🏸",
  "🎾",
  "🏊",
  "🏐",
  "🏓",
  "💪",
  "🥊",
  "🥋",
  "🏃",
  "🚴",
];

export default function KategoriPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("⚽");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const loadCategories = async () => {
    try {
      const response = await fetch(
        "/api/categories"
      );

      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Nama kategori wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await fetch("/api/categories", {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: editingId,
            name,
            icon,
          }),
        });
      } else {
        await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            name,
            icon,
          }),
        });
      }

      setName("");
      setIcon("⚽");
      setEditingId(null);

      loadCategories();
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan");
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus kategori?"
    );

    if (!confirmDelete) return;

    try {
      await fetch("/api/categories", {
        method: "DELETE",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });

      loadCategories();
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus kategori");
    }
  };

  const handleEdit = (
    category: Category
  ) => {
    setEditingId(category.id);
    setName(category.name);
    setIcon(category.icon);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setIcon("⚽");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">
          Kategori Olahraga
        </h1>

        <p className="text-slate-500 mt-1">
          Kelola kategori yang akan
          tampil pada halaman user.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl border p-5 shadow-sm space-y-4">
        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Contoh: Futsal"
        />

        <div className="grid grid-cols-6 gap-3">
          {SPORT_ICONS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() =>
                setIcon(emoji)
              }
              className={`h-14 rounded-xl border text-2xl transition ${
                icon === emoji
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-slate-200"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="w-4 h-4 mr-2" />

            {editingId
              ? "Update"
              : "Tambah"}
          </Button>

          {editingId && (
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              <X className="w-4 h-4 mr-2" />
              Batal
            </Button>
          )}
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            Memuat data...
          </div>
        ) : categories.length > 0 ? (
          <div className="divide-y">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="group p-4 flex justify-between items-center hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {cat.name}
                    </h3>

                    <div className="flex gap-2 text-xs text-slate-500">
                      <span>
                        #{cat.slug}
                      </span>

                      <span>
                        •{" "}
                        {cat._count
                          ?.fields || 0}{" "}
                        lapangan
                      </span>
                    </div>
                  </div>
                </div>

                <div className="opacity-0 group-hover:opacity-100 flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleEdit(cat)
                    }
                  >
                    <Pencil
                      size={16}
                    />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleDelete(
                        cat.id
                      )
                    }
                  >
                    <Trash2
                      size={16}
                      className="text-red-500"
                    />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-slate-500">
            <AlertCircle className="mx-auto mb-3" />

            Belum ada kategori.
          </div>
        )}
      </div>
    </div>
  );
}