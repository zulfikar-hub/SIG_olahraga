"use client";

import { useEffect, useState } from "react";

import {
  X,
  Car,
  Sparkles,
  UtensilsCrossed,
  ExternalLink,
  Star,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

interface Facility {
  id: number;
  name: string;
  district: string;
  address: string;
  description?: string;
  phone?: string;
  openHours?: string;
  latitude: number;
  longitude: number;

  images: {
    id: number;
    url: string;
  }[];

  fields: {
    id: number;
    name: string;
    price: number;
    status: string;

    category: {
      id: number;
      name: string;
    };
  }[];
}

interface InfoCardProps {
  facility: {
    id: number;
  } | null;

  isOpen: boolean;

  onClose: () => void;
}

export function InfoCard({
  facility,
  isOpen,
  onClose,
}: InfoCardProps) {
  const [detail, setDetail] =
    useState<Facility | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [isDetailView, setIsDetailView] =
    useState(false);

  useEffect(() => {
    if (!facility || !isOpen) return;

    loadFacility();
  }, [facility, isOpen]);

  const loadFacility = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/facilities/${facility?.id}`
      );

      const data =
        await response.json();

      setDetail(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsDetailView(false);
    setDetail(null);
    onClose();
  };

  const getAmenityIcon = (
    name: string
  ) => {
    switch (
      name.toLowerCase()
    ) {
      case "parkir":
        return (
          <Car className="w-4 h-4" />
        );

      case "toilet":
        return (
          <Sparkles className="w-4 h-4" />
        );

      case "kantin":
        return (
          <UtensilsCrossed className="w-4 h-4" />
        );

      default:
        return (
          <Sparkles className="w-4 h-4" />
        );
    }
  };

    return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={handleClose}
  className="fixed inset-0 z-[1050] bg-black/25 backdrop-blur-[1px] transition-all duration-300"
/>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 26,
              stiffness: 220,
            }}
            className="fixed top-16 right-0 z-[1100] bottom-0 z-50 w-full max-w-sm bg-white border-l shadow-xl flex flex-col"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white shadow hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                Memuat data...
              </div>
            ) : !detail ? (
              <div className="flex-1 flex items-center justify-center">
                Data tidak ditemukan
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto">

                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={
                        detail.images.length > 0
                          ? detail.images[0].url
                          : "/placeholder.jpg"
                      }
                      alt={detail.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>

                  <div className="p-5 space-y-5">

                    {!isDetailView ? (
                      <>
                        <div>
                          <h2 className="text-xl font-bold">
                            {detail.name}
                          </h2>

                          <p className="text-sm text-slate-500 mt-1">
                            {detail.district}
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))

                          }

                          <span className="text-sm font-medium ml-2">
                            5.0
                          </span>
                        </div>

                        <div className="border rounded-xl p-4 bg-slate-50">
                          <p className="text-xs text-slate-500">
                            Alamat
                          </p>

                          <p className="text-sm mt-1">
                            {detail.address}
                          </p>
                        </div>

                        {detail.description && (
                          <div>
                            <h3 className="font-semibold mb-2">
                              Deskripsi
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed">
                              {detail.description}
                            </p>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">

                          <div className="border rounded-xl p-3">
                            <p className="text-xs text-slate-500">
                              Jam Operasional
                            </p>

                            <p className="font-medium mt-1">
                              {detail.openHours ?? "-"}
                            </p>
                          </div>

                          <div className="border rounded-xl p-3">
                            <p className="text-xs text-slate-500">
                              Telepon
                            </p>

                            <p className="font-medium mt-1">
                              {detail.phone ?? "-"}
                            </p>
                          </div>

                        </div>                       </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setIsDetailView(false)
                          }
                          className="flex items-center gap-2 text-sm font-medium hover:text-emerald-600"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Kembali
                        </button>

                        <div>
                          <h3 className="text-lg font-bold">
                            Daftar Lapangan
                          </h3>

                          <p className="text-sm text-slate-500">
                            {detail.fields.length} Lapangan
                          </p>
                        </div>

                        <div className="space-y-3">
                          {detail.fields.length >
                          0 ? (
                            detail.fields.map(
                              (field) => (
                                <div
                                  key={field.id}
                                  className="border rounded-xl p-4"
                                >
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-semibold">
                                        {field.name}
                                      </h4>

                                      <p className="text-xs text-slate-500">
                                        {
                                          field
                                            .category
                                            .name
                                        }
                                      </p>
                                    </div>

                                    <span
                                      className={`text-xs px-2 py-1 rounded-full ${
                                        field.status ===
                                        "AVAILABLE"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {
                                        field.status
                                      }
                                    </span>
                                  </div>

                                  <p className="mt-3 text-lg font-bold text-emerald-600">
                                    Rp{" "}
                                    {field.price.toLocaleString(
                                      "id-ID"
                                    )}
                                    /jam
                                  </p>
                                </div>
                              )
                            )
                          ) : (
                            <div className="border rounded-xl p-5 text-center text-slate-500">
                              Belum ada
                              lapangan.
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="border-t p-4 space-y-3">

                  <Button
                    onClick={() =>
                      setIsDetailView(
                        !isDetailView
                      )
                    }
                    className="w-full"
                  >
                    {isDetailView
                      ? "Sembunyikan Detail"
                      : "Lihat Detail Lapangan"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${detail.latitude},${detail.longitude}`,
                        "_blank"
                      )
                    }
                  >
                    <ExternalLink className="w-4 h-4" />
                    Petunjuk Rute
                  </Button>

                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}