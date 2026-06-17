import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const facilities = await prisma.facility.findMany({
      include: {
        fields: {
          include: {
            category: true,
          },
        },
        images: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(facilities);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal mengambil data fasilitas",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const facility = await prisma.facility.create({
      data: {
        name: body.name,
        district: body.district,
        address: body.address,
        latitude: Number(body.latitude),
        longitude: Number(body.longitude),
        description: body.description || null,
        phone: body.phone || null,
        openHours: body.openHours || null,
        thumbnail: body.thumbnail || null,
      },
    });

    await prisma.notification.create({
      data: {
        title: `Fasilitas "${body.name}" berhasil ditambahkan`,
      },
    });

    return NextResponse.json(facility, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menambahkan fasilitas",
      },
      {
        status: 500,
      }
    );
  }
}