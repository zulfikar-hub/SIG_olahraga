"use client";

import { useEffect, useState } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  Loader2,
  Trash2,
  Pencil,
} from "lucide-react";

interface GalleryFormProps {
  facilityId: number;
}

interface GalleryImage {
  id: number;
  url: string;
}

export default function GalleryForm({
  facilityId,
}: GalleryFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingImages, setLoadingImages] =
    useState(true);

  useEffect(() => {
  loadImages();
}, [facilityId]);

  const loadImages = async () => {
    try {
      const response = await fetch(
        `/api/galerry?facilityId=${facilityId}`
      );

      const data = await response.json();

      setImages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Pilih gambar terlebih dahulu");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append(
        "facilityId",
        String(facilityId)
      );

      const response = await fetch(
        "/api/galerry",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setFiles([]);

      await loadImages();

      alert("Upload berhasil");
    } catch (error) {
      console.error(error);

      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    imageId: number
  ) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus gambar?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        "/api/galerry",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id: imageId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      setImages((prev) =>
        prev.filter(
          (image) => image.id !== imageId
        )
      );
    } catch (error) {
      console.error(error);

      alert("Gagal menghapus gambar");
    }
  };

  const handleReplaceImage = async (
  imageId: number,
  file: File
) => {
  try {
    const formData = new FormData();

    formData.append(
      "imageId",
      String(imageId)
    );

    formData.append(
      "file",
      file
    );

    const response = await fetch(
      "/api/galerry",
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error();
    }

    await loadImages();

    alert("Gambar berhasil diganti");
  } catch (error) {
    console.error(error);

    alert("Gagal mengganti gambar");
  }
};

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          Kelola Galeri
        </h3>

        <p className="text-sm text-slate-500">
          Upload dan kelola foto fasilitas
        </p>
      </div>

      {/* Upload Area */}
      <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition">
        <UploadCloud className="w-10 h-10 text-slate-400 mb-3" />

        <h4 className="font-medium text-slate-700">
          Klik atau tarik gambar ke sini
        </h4>

        <p className="text-sm text-slate-500 mt-1">
          PNG, JPG, JPEG
        </p>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Preview Upload */}
      {files.length > 0 && (
        <>
          <div className="bg-slate-50 border rounded-xl px-4 py-3">
            <p className="text-sm text-slate-600">
              {files.length} gambar dipilih
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border bg-white"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 object-cover"
                />

                <div className="p-2">
                  <p className="text-xs text-slate-500 truncate">
                    {file.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Gallery Tersimpan */}
      <div className="space-y-3">
        <h4 className="font-semibold text-slate-900">
          Galeri Saat Ini
        </h4>

        {loadingImages ? (
          <div className="text-sm text-slate-500">
            Memuat gambar...
          </div>
        ) : images.length === 0 ? (
          <div className="border rounded-xl p-8 text-center text-slate-500">
            Belum ada gambar
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-xl border group"
              >
                <img
                  src={image.url}
                  alt=""
                  className="w-full h-32 object-cover"
                />

                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
  <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer">
    <Pencil className="w-4 h-4" />

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => {
        const file =
          e.target.files?.[0];

        if (!file) return;

        handleReplaceImage(
          image.id,
          file
        );
      }}
    />
  </label>

  <button
    onClick={() =>
      handleDelete(image.id)
    }
    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
  >
    <Trash2 className="w-4 h-4" />
  </button>
</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <ImageIcon className="w-4 h-4" />
            Upload Gambar
          </>
        )}
      </button>
    </div>
  );
}