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
import { loginValidation } from "@/lib/schemaValidation/user";

const LoginForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginValidation),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(values) {
        try {
            setIsLoading(true);
            const res = await axios.post("/api/login", values);

            const user = res.data.user;

            if (res.status === 201) {
                router.refresh();
                router.push(`/profile/${user.id}`);
            }
            setIsLoading(false);

        } catch (error) {
            if (error.response.status === 401) {
                form.setError("password", {
                    message: "Invalid email or password!",
                });
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full" {...form}>
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
                        {isLoading ? <span>Logging in...</span> : <span>Log in</span>}
                    </Button>
                </div>
                <span className="text-center">
                    Don&apost have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-500 hover:text-blue-700 transition"
                    >
                        Register
                    </Link>
                </span>
            </form>
        </Form>
    );
};

export default LoginForm;