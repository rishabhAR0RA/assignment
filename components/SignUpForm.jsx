"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { registerValidation } from "@/lib/schemaValidation/user";

const SignUpForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(registerValidation),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const res = await axios.post("/api/signup", values);

            if (res.status === 201) {
                router.refresh();
                router.push("/login");
            }
            setIsLoading(false);

        } catch (error) {
            if (error.response.status === 409) {
                const { userExist, emailExist } = error.response.data;

                if (userExist) {
                    form.setError("name", {
                        message: "Username already exists!",
                    });
                }

                if (emailExist) {
                    form.setError("email", {
                        message: "Email already in use!",
                    });
                }
            }

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Username" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Email" {...field} type="email" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Password" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="pt-2">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? <span>Registering...</span> : <span>Register</span>}
                    </Button>
                </div>
                <span className="text-center">
                    Already a user?{" "}
                    <Link
                        href="/login"
                        className="text-blue-500 hover:text-blue-700 transition"
                    >
                        Login
                    </Link>
                </span>
            </form>
        </Form>

    );
};

export default SignUpForm;