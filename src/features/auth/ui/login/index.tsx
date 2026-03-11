"use client";

import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { Button } from "@/shared/ui";
import { FormTextInput } from "@/shared/lib/form/form-text-input";

import { WrapperForm } from "../wrapper-form";

interface IForm {
    email: string;
    password: string;
}

export const Login = ({}) => {
    const methods = useForm<IForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
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
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum length is 6",
                            },
                        }}
                    />
                    <Button className="rounded-full text-white ">Login</Button>
                </form>
            </WrapperForm>
        </FormProvider>
    );
};
