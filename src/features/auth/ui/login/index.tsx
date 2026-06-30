'use client';

import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { Button } from "@/shared/ui";
import { GoogleSigninBtn } from "@/shared/ui/auth";
import { FormTextInput } from "@/shared/lib/form/form-text-input";

import { WrapperForm } from "../wrapper-form";

interface IForm {
    email: string;
    password: string;
}

export const Login = ({}) => {
    const router = useRouter();

    const methods = useForm<IForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IForm> = async (data) => {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (result?.error) {
            toast.error("Невірний імейл або пароль");
        } else {
            toast.success("Ви увійшли!");
            router.refresh();
            router.push("/");
        }
    };

    return (
        <FormProvider {...methods}>
            <WrapperForm>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8"
                >
                    <FormTextInput<IForm>
                        label="Email"
                        name="email"
                        placeholder="Email"
                        rules={{
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                            },
                        }}
                    />
                    <FormTextInput<IForm>
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="password"
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum length is 6",
                            },
                        }}
                    />
                    <Button className="rounded-full text-white ">Login</Button>
                    <GoogleSigninBtn />
                </form>
            </WrapperForm>
        </FormProvider>
    );
};
