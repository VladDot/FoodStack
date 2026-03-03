"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { WrapperForm } from "../wrapper-form";
import { FormTextInput } from "@/features/form/form-text-input";

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

                    <button type="submit">Login</button>
                </form>
            </WrapperForm>
        </FormProvider>
    );
};
