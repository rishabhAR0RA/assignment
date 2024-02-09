import Link from "next/link";
import { db } from "@/lib/db";
import Profile from "@/components/Profile";

const Page = async ({ params }) => {
    const user = await db.user.findFirst({
        where: {
            id: params.slug,
        },
        select: {
            id: true,
            email: true,
            name: true,
            age: true,
            dob: true,
            contact: true,
        }
    });

    if (!user) {
        return (
            <div>
                <p className="text-center p-2">User could not be found or does not exists.</p>
            </div>
        );
    }

    user.dob = user.dob.toLocaleDateString();

    return (
        <Profile user={user} />
    );
}

export default Page;

