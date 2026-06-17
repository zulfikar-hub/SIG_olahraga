import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      );
    }

    // Response login berhasil
   const response = NextResponse.json(
  {
    message: "Login berhasil",
  },
  {
    status: 200,
  }
);

response.cookies.set("session", admin.id.toString(), {
  httpOnly: true,
  secure: false, // sementara false dulu saat localhost
  path: "/",
  maxAge: 60 * 60 * 24,
});

return response;

  } catch (error: any) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      {
        message: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    );
  }
}