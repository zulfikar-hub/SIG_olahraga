import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key:", process.env.CLOUDINARY_API_KEY);
console.log("API Secret:", process.env.CLOUDINARY_API_SECRET);

/*
=========================================
UPLOAD TO CLOUDINARY
=========================================
*/
function uploadToCloudinary(
  buffer: Buffer
): Promise<string> {
  return new Promise(
    (resolve, reject) => {
      const stream =
        cloudinary.uploader.upload_stream(
          {
            folder: "web-gis-sport",
          },
          (
            error,
            result
          ) => {
            if (error)
              return reject(error);

            if (!result)
              return reject(
                new Error(
                  "Upload gagal"
                )
              );

            resolve(
              result.secure_url
            );
          }
        );

      Readable.from(buffer).pipe(
        stream
      );
    }
  );
}

/*
=========================================
GET PUBLIC ID FROM CLOUDINARY URL
=========================================
*/
function getPublicId(url: string) {
  try {
    const parts = url.split("/");

    const uploadIndex = parts.findIndex(
      (part) => part === "upload"
    );

    if (uploadIndex === -1) return null;

    const pathParts = parts.slice(uploadIndex + 2);

    const fullPath = pathParts.join("/");

    return fullPath.replace(/\.[^/.]+$/, "");
  } catch {
    return null;
  }
}

/*
=========================================
UPLOAD IMAGE
=========================================
*/
export async function POST(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const facilityId = Number(
      formData.get(
        "facilityId"
      )
    );

    const files =
      formData.getAll(
        "files"
      ) as File[];

    const uploadedImages =
      [];

    for (const file of files) {
      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const imageUrl =
        await uploadToCloudinary(
          buffer
        );

      const image =
        await prisma.image.create({
          data: {
            url: imageUrl,
            facilityId,
          },
        });

      uploadedImages.push(
        image
      );
    }

    return NextResponse.json(
      uploadedImages
    );
  } catch (error: any) {
  console.error("UPLOAD ERROR");
  console.error(error);

  return NextResponse.json(
    {
      message: error.message,
      error: String(error),
    },
    {
      status: 500,
    }
  );
}
}

/*
=========================================
GET GALLERY
=========================================
*/
export async function GET(
  req: Request
) {
  try {
    const { searchParams } =
      new URL(req.url);

    const facilityId = Number(
      searchParams.get(
        "facilityId"
      )
    );

    const images =
      await prisma.image.findMany({
        where: {
          facilityId,
        },
        orderBy: {
          id: "desc",
        },
      });

    return NextResponse.json(
      images
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal mengambil galeri",
      },
      {
        status: 500,
      }
    );
  }
}

/*
=========================================
DELETE IMAGE
=========================================
*/
export async function DELETE(
  req: Request
) {
  try {
    const body =
      await req.json();

    const imageId = Number(
      body.id
    );

    const image =
      await prisma.image.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!image) {
      return NextResponse.json(
        {
          message:
            "Gambar tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    const publicId =
      getPublicId(image.url);

    if (publicId) {
      await cloudinary.uploader.destroy(
        publicId
      );
    }

    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Gambar berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal menghapus gambar",
      },
      {
        status: 500,
      }
    );
  }
}

/*
=========================================
UPDATE IMAGE
=========================================
*/
export async function PUT(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const imageId = Number(
      formData.get("imageId")
    );

    const file =
      formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        {
          message:
            "File tidak ditemukan",
        },
        {
          status: 400,
        }
      );
    }

    const oldImage =
      await prisma.image.findUnique({
        where: {
          id: imageId,
        },
      });

    if (!oldImage) {
      return NextResponse.json(
        {
          message:
            "Gambar tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    /*
    =========================================
    Hapus gambar lama di Cloudinary
    =========================================
    */

    const publicId =
      getPublicId(oldImage.url);

    if (publicId) {
      await cloudinary.uploader.destroy(
        publicId
      );
    }

    /*
    =========================================
    Upload gambar baru
    =========================================
    */

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const imageUrl =
      await uploadToCloudinary(
        buffer
      );

    /*
    =========================================
    Update Database
    =========================================
    */

    const updatedImage =
      await prisma.image.update({
        where: {
          id: imageId,
        },
        data: {
          url: imageUrl,
        },
      });

    return NextResponse.json(
      updatedImage
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal mengganti gambar",
      },
      {
        status: 500,
      }
    );
  }
}