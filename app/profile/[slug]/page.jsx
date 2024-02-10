import Link from "next/link";
import { db } from "@/lib/db";

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
        <div className="bg-gray-100 min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
                    <Link href={`/update/${user.id}`} className="text-blue-500 hover:underline">
                        Update
                    </Link>
                </div>
                <div>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <p className="text-gray-600">Age: {user.age}</p>
                    <p className="text-gray-600">Date of Birth: {user.dob}</p>
                    <p className="text-gray-600">Contact: {user.contact}</p>
                </div>
            </div>
        </div>
    );
}

export default Page;

