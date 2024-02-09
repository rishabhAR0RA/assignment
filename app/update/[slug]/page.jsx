import { db } from "@/lib/db";
import UpdateForm from "@/components/UpdateForm";

const Page = async ({ params }) => {
    const user = await db.user.findFirst({
        where: {
            id: params.slug,
        },
        select: {
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

    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="p-4 lg:p-8 h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Update Details
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details to update them
                        </p>
                    </div>
                    <UpdateForm user={user} />
                </div>
            </div>
        </div>
    );
}

export default Page;