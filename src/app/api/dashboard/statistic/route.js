import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await auth()
    if (!session) {
        return NextResponse.json({
            message: "Unauthorized",
        })
    }
    const devices = await prisma.devices.findMany({
        select: {
            id: true,
            name: true,
            status: true,
        }
    });

    const userTotal = await prisma.user.count();
    const deviceOffline = devices.filter((device) => device.status === "offline" || device.status === "");
    const deviceOnline = devices.filter((device) => device.status === "online");
    
    return NextResponse.json({
        status: 200,
        message: "Success",
        data: [
            {
                title: "Daftar Perangkat",
                value: devices.length
            },
            {
                title: "Perangkat Online",
                value: deviceOnline.length
            },
            {
                title: "Perangkat Offline",
                value: deviceOffline.length
            },
            {
                title: "Pengguna",
                value: userTotal
            }
        ]
    });
}