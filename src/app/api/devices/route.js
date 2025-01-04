import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({
      message: "Id Field Required",
    });
  }
  const data = await prisma.devices.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      status: true,
      roomId: true,
      virtualpin: true,
    },
  });

  if (!data) {
    return NextResponse.json({
      message: "Device Not Found",
    });
  }

  return NextResponse.json({
    data: data,
  });
}
