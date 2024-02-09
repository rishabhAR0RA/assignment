import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { z } from "zod";
import { NextResponse } from "next/server";
import { registerValidation } from "@/lib/schemaValidation/user";

export async function POST(req) {
    try {
        const data = await req.json();
        const { name, email, password } = registerValidation.parse(data);

        const existingUser = await db.user.findFirst({
            where: {
                name,
            }
        });

        const existingEmail = await db.user.findFirst({
            where: {
                email,
            }
        });

        if (existingUser) {
            return NextResponse.json({ success: false, userExist: true, message: "Username already exists!" }, { status: 409 });
        }

        if (existingEmail) {
            return NextResponse.json({ success: false, emailExist: true, message: "Email already in use!" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 12);

        const res = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });

        return NextResponse.json({ success: true, message: "User registered successfully!" }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: error.message }, { status: 422 });
        }

        console.log("[USERS_REGISTER]");
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}