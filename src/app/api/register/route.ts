import bcrypt from "bcryptjs";
import { z } from "zod";
import { NextResponse } from "next/server";

import { prisma } from "@/shared/api/prisma";

const registerSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters").max(8, "Password must be at most 8 characters"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            const errors = validation.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return NextResponse.json({ errors }, { status: 400 });
        }

        const { email, password } = validation.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ errors: [{ field: "email", message: "Користувач вже існує" }] }, { status: 400 });
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
