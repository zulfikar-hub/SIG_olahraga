import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalFacilities =
      await prisma.facility.count();

    const totalFields =
      await prisma.field.count();

    const totalCategories =
      await prisma.category.count();

    const totalImages =
      await prisma.image.count();

    return NextResponse.json({
      facilities: totalFacilities,
      fields: totalFields,
      categories: totalCategories,
      images: totalImages,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal mengambil statistik",
      },
      {
        status: 500,
      }
    );
  }
}