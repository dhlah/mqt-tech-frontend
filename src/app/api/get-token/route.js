import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // Pastikan import ini ditambahkan

const JWT_SECRET = process.env.JWT_SECRET

export async function GET(request) {
  try {
    // Mendapatkan data user dari auth
    const data = await auth();

    if (!data?.user) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Membuat JWT Token
    const token = jwt.sign(
      { username: data.user.username, role: data.user.role },
      JWT_SECRET,
      { expiresIn: "15m" } // Token berlaku 1 jam
    );

    // Update token di database
    const updateToken = await prisma.user.update({
      where: { username: data.user.username },
      data: { token },
    });

    // Mengembalikan response yang sukses
    return NextResponse.json({
      message: "Token updated successfully",
    });
  } catch (err) {
    console.error("Error updating token:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
