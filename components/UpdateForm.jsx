"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { updateValidation } from "@/lib/schemaValidation/user";

const UpdateForm = ({ user }) => {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(updateValidation),
        defaultValues: {
            name: "",
            email: "",
            age: "",
            dob: "",
            contact: "",
        }
    });

    async function onSubmit(values) {
        try {

            const res = await axios.post("/api/update", values);

            const userId = res.data.user.id;

            if (res.status === 201) {
                router.refresh();
                router.push(`/profile/${userId}`);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const isLoading = form.formState.isLoading;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

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
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Age" {...field} type="text" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Date of Birth" {...field} type="date" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contact</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Contact" {...field} type="phone" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-2">
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        Update
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default UpdateForm;