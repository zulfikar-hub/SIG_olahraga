import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const fields = await prisma.field.findMany({
    include: {
      facility: true,
      category: true,
    },
  });

  return NextResponse.json(fields);
}

export async function POST(req: Request) {
  const body = await req.json();

  const field = await prisma.field.create({
    data: {
      name: body.name,
      price: Number(body.price),
      facilityId: Number(body.facilityId),
      categoryId: Number(body.categoryId),
      status: body.status,
      title: `Lapangan "${body.name}" berhasil ditambahkan`,
    },
  });

  return NextResponse.json(field);
}

export async function PUT(req: Request) {
  const body = await req.json();

  const field = await prisma.field.update({
    where: {
      id: Number(body.id),
    },
    data: {
      name: body.name,
      price: Number(body.price),
      facilityId: Number(body.facilityId),
      categoryId: Number(body.categoryId),
      status: body.status,
      title: `Lapangan "${body.name}" diperbarui`,
    },
  });

  return NextResponse.json(field);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  await prisma.field.delete({
    where: {
      id: Number(body.id),
      title: `Lapangan "${body.name}" berhasil dihapus`,
    },
  });

  return NextResponse.json({
    message: "Lapangan berhasil dihapus",
  });
}