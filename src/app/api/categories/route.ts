import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const categories =
      await prisma.category.findMany({
        include: {
          _count: {
            select: {
              fields: true,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      });

    return NextResponse.json(
      categories
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal mengambil kategori",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    if (!body.name) {
      return NextResponse.json(
        {
          message:
            "Nama kategori wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    const slug = body.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const category =
      await prisma.category.create({
        data: {
          name: body.name,
          slug,
          icon:
            body.icon || "🏷️",
        },
      });
      await prisma.notification.create({
  data: {
    title: `Kategori "${body.name}" berhasil ditambahkan`,
  },
});

    return NextResponse.json(
      category,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal membuat kategori",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(
  request: Request
) {
  try {
    const body =
      await request.json();

    const slug = body.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const category =
      await prisma.category.update({
        where: {
          id: Number(body.id),
        },
        data: {
          name: body.name,
          slug,
          icon:
            body.icon || "🏷️",
        },
      });

    return NextResponse.json(
      category
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal update kategori",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const body =
      await request.json();

    const categoryId =
      Number(body.id);

    const totalField =
      await prisma.field.count({
        where: {
          categoryId,
        },
      });

    if (totalField > 0) {
      return NextResponse.json(
        {
          message:
            "Kategori masih digunakan oleh lapangan",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Gagal menghapus kategori",
      },
      {
        status: 500,
      }
    );
  }
}