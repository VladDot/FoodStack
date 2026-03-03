"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { WrapperForm } from "../wrapper-form";
import { FormTextInput } from "@/features/form/form-text-input";

interface IForm {
    email: string;
    password: string;
}

export const Register = ({}) => {
    const methods = useForm<IForm>();

    const onSubmit: SubmitHandler<IForm> = (data) => {
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-80 tablet:w-100 "
            >
                <WrapperForm>
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
                        placeholder="Password"
                        rules={{ required: "Password is required" }}
                    />
                </WrapperForm>

                <button type="submit">Login</button>
            </form>
        </FormProvider>
    );
};
