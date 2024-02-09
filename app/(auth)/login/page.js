import LoginForm from "@/components/LoginForm";

const Page = () => {
    return (
        <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="p-4 lg:p-8 h-full flex items-center">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Login
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to login
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default Page;