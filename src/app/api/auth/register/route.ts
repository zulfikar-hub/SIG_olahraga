import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // Ambil body
    const body = await request.json();

    const name = body?.name?.trim();
    const email = body?.email?.trim().toLowerCase();
    const password = body?.password?.trim();

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "Semua data wajib diisi",
        },
        {
          status: 400,
        }
      );
    }

    // Cek email sudah ada
    const existingAdmin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      return NextResponse.json(
        {
          message: "Email sudah terdaftar",
        },
        {
          status: 409,
        }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Simpan admin
    const newAdmin = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        admin: {
          id: newAdmin.id,
          name: newAdmin.name,
          email: newAdmin.email,
        },
      },
      {
        status: 201,
      }
    );

  } catch (error: any) {
    console.error(
      "REGISTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        message: error?.message || "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}