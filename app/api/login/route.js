import { db } from "@/lib/db";
import { compare } from "bcrypt";
import { z } from "zod";
import { NextResponse } from "next/server";
import { loginValidation } from "@/lib/schemaValidation/user";

export async function POST(req) {
    try {
        const data = await req.json();
        const { email, password } = loginValidation.parse(data);

        const user = await db.user.findUnique({
            where: {
                email,
            },
            select: {
                id: true,
                name: true,
                password: true,
            }
        });

        const isMatch = await compare(password, user.password);

        if (isMatch) {
            const { password: _, ...userData } = user;
            return NextResponse.json({ success: true, message: `${user.name} successfully logged in!`, user: userData }, { status: 201 });
        } else {
            return NextResponse.json({ success: false, message: 'Incorrect username or password!' }, { status: 401 });
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: error.message }, { status: 422 });
        }

        console.log("[USERS_LOGIN]");
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}