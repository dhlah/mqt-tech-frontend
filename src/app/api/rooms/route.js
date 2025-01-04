import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const data = await prisma.room.findMany({
        include: {
            devices: {
                select: {
                    id: true,       // Ambil kolom id
                    name: true,     // Ambil kolom name
                    roomId: true,   // Ambil kolom roomId
                    status: true,   // Ambil kolom status
                }
            }
        }
    });
    const filteredData = data.filter(item => item.name !== 'Services');

    return NextResponse.json({
        data: filteredData
    })
}