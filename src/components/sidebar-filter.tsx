"use client";

import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  FilterX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

interface SidebarFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  onCategoryChange: (
    categories: string[]
  ) => void;
}

export function SidebarFilter({
  isOpen,
  onToggle,
  onCategoryChange,
}: SidebarFilterProps) {
  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<string[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories =
    async () => {
      try {
        setLoading(true);

        const response =
          await fetch(
            "/api/categories"
          );

        if (!response.ok) {
          throw new Error(
            "Gagal mengambil kategori"
          );
        }

        const data =
          await response.json();

        setCategories(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  const handleCategoryToggle = (
    categoryName: string
  ) => {
    const updated =
      selectedCategories.includes(
        categoryName
      )
        ? selectedCategories.filter(
            (item) =>
              item !== categoryName
          )
        : [
            ...selectedCategories,
            categoryName,
          ];

    setSelectedCategories(
      updated
    );

    onCategoryChange(updated);
  };

  const clearFilter = () => {
    setSelectedCategories([]);

    onCategoryChange([]);
  };

    return (
    <>
      <aside
        className={`fixed left-0 top-16 bottom-0 w-56 bg-white border-r border-slate-200 shadow-sm z-[1000] transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b">
            <div>
              <h2 className="font-semibold text-slate-800">
                Filter Olahraga
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Pilih kategori olahraga
              </p>
            </div>

            <button
              onClick={onToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* List Kategori */}
          <div className="flex-1 overflow-y-auto px-3 py-4">

            {loading ? (
              <div className="space-y-3">

                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-11 rounded-lg bg-slate-100 animate-pulse"
                  />
                ))}

              </div>
            ) : categories.length === 0 ? (

              <div className="text-center text-sm text-slate-500 mt-8">
                Belum ada kategori.
              </div>

            ) : (

              <div className="space-y-2">

                {categories.map((category) => {

                  const isSelected =
                    selectedCategories.includes(
                      category.name
                    );

                  return (
                    <button
                      key={category.id}
                      onClick={() =>
                        handleCategoryToggle(
                          category.name
                        )
                      }
                      className={`w-full flex items-center justify-between rounded-xl border px-3 py-3 transition-all ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-slate-200 bg-white hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">

                        <span className="text-xl">
                          {category.icon}
                        </span>

                        <div className="text-left">
                          <p
                            className={`text-sm font-medium ${
                              isSelected
                                ? "text-emerald-700"
                                : "text-slate-700"
                            }`}
                          >
                            {category.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {category.slug}
                          </p>
                        </div>

                      </div>

                      <div
                        className={`w-3 h-3 rounded-full transition ${
                          isSelected
                            ? "bg-emerald-500"
                            : "bg-slate-200"
                        }`}
                      />

                    </button>
                  );
                })}

              </div>

            )}

          </div> 

                    <AnimatePresence>
            {selectedCategories.length > 0 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                }}
                className="border-t p-4"
              >
                <Button
                  onClick={clearFilter}
                  variant="outline"
                  className="w-full border-dashed border-red-300 text-red-600 hover:bg-red-50"
                >
                  <FilterX className="w-4 h-4 mr-2" />
                  Bersihkan Filter
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </aside>

      {/* Tombol buka sidebar */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="lg:hidden fixed left-4 top-24 z-[990] p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-all"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Overlay Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={onToggle}
            className="lg:hidden fixed inset-0 top-16 bg-black/20 backdrop-blur-[1px] z-[900]"
          />
        )}
      </AnimatePresence>
    </>
  );
}