import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const facility = await prisma.facility.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        fields: {
          include: {
            category: true,
          },
        },
        images: true,
      },
    });

    if (!facility) {
      return NextResponse.json(
        { message: "Fasilitas tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(facility);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Gagal mengambil data fasilitas" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const body = await req.json();

   const facility = await prisma.facility.update({
  where: {
    id: Number(id),
  },
  data: {
    name: body.name,
    district: body.district,
    address: body.address,
    latitude: Number(body.latitude),
    longitude: Number(body.longitude),
    description: body.description ?? null,
    phone: body.phone ?? null,
    openHours: body.openHours ?? null,
    thumbnail: body.thumbnail ?? null,
    status: body.status ?? "ACTIVE",
  },
});

await prisma.notification.create({
  data: {
    title: `Fasilitas "${facility.name}" berhasil diperbarui`,
  },
});

return NextResponse.json(facility);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal mengupdate fasilitas",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const facility = await prisma.facility.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!facility) {
      return NextResponse.json(
        {
          message: "Fasilitas tidak ditemukan",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.facility.delete({
      where: {
        id: Number(id),
      },
    });

    await prisma.notification.create({
      data: {
        title: `Fasilitas "${facility.name}" berhasil dihapus`,
      },
    });

    return NextResponse.json({
      message: "Fasilitas berhasil dihapus",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Gagal menghapus fasilitas",
      },
      {
        status: 500,
      }
    );
  }
}