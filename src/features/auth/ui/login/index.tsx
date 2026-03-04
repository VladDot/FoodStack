"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { FormTextInput } from "@/shared/lib/form/form-text-input";

import { WrapperForm } from "../wrapper-form";

interface IForm {
    email: string;
    password: string;
}

export const Login = ({}) => {
    const methods = useForm<IForm>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IForm> = (data) => {
        console.log(data);
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
                        defaultValue=""
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum length is 6",
                            },
                        }}
                    />

                    <button type="submit">Login</button>
                </form>
            </WrapperForm>
        </FormProvider>
    );
};
