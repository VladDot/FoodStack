"use client";

import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { PasswordInput } from "@/shared/ui/input";
import { ConfirmModal } from "@/features/confirm-modal/ui";
import { FormTextInput } from "@/shared/lib/form/form-text-input";
import { useConfirmModal } from "@/features/confirm-modal/model/useConfirmModal";

import { WrapperForm } from "../wrapper-form";

interface IForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = ({}) => {
    const methods = useForm<IForm>();

    const { isOpen, openModal, closeModal, handleConfirm } = useConfirmModal();

    const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
        openModal(() => {
            console.log(data);

            toast.success("Користувач успішно зареєстрований!");
            methods.reset();
        });
    };

    console.log(isOpen);

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
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        component={PasswordInput}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        }}
                    />
                    <FormTextInput<IForm>
                        type="password"
                        name="confirmPassword"
                        label="Confirm Password"
                        component={PasswordInput}
                        placeholder="Confirm Password"
                        rules={{
                            required: "Please confirm your password",
                            validate: (value) =>
                                value === methods.getValues("password") ||
                                "Passwords do not match",
                        }}
                    />

                    <button type="submit">Register</button>
                </form>
                <ConfirmModal
                    isOpen={isOpen}
                    setIsOpen={closeModal}
                >
                    <button
                        type="button"
                        onClick={handleConfirm}
                    >
                        Так
                    </button>
                    <button
                        type="button"
                        onClick={closeModal}
                    >
                        Ні
                    </button>
                </ConfirmModal>
            </WrapperForm>
        </FormProvider>
    );
};
