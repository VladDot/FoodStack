import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/shared/api/prisma";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Заповніть усі поля" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ message: "Користувач вже існує" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        return NextResponse.json({ message: "Успіх", userId: user.id }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
    }
}
