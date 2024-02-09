import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { updateValidation } from "@/lib/schemaValidation/user";
import { z } from "zod";

export async function POST(req) {
    try {
        const data = await req.json();
        data.dob = new Date(data.dob);
        const { email, name, age, dob, contact } = updateValidation.parse(data);

        const ageInt = Number(age);

        const updatedUser = await db.user.update({
            where: {
                email: email,
            },
            data: {
                email: email,
                name: name,
                age: ageInt,
                dob: dob,
                contact: contact,
            },
        });

        const { password: _, ...userData } = updatedUser;
        return NextResponse.json({ success: true, message: "User details updated successfully", user: userData }, { status: 201 });

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: error.message }, { status: 422 });
        }

        console.log("[USERS_UPDATE]");
        console.log(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}
