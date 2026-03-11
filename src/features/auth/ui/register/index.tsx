"use client";

import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/input";
import { ConfirmModal } from "@/shared/ui/confirm-modal/ui";
import { FormTextInput } from "@/shared/lib/form/form-text-input";
import { useConfirmModal } from "@/shared/ui/confirm-modal/model/useConfirmModal";

import { WrapperForm } from "../wrapper-form";

interface IForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = ({}) => {
    const methods = useForm<IForm>({
        mode: "onBlur",
        reValidateMode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { isOpen, openModal, closeModal, handleConfirm } = useConfirmModal();

    const onSubmit: SubmitHandler<IForm> = async (data: IForm) => {
        openModal(() => {
            console.log(data);

            toast.success("Користувач успішно зареєстрований!");
            methods.reset();
        });
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
                    <Button className="rounded-full text-white">
                        Register
                    </Button>
                </form>
                <ConfirmModal
                    isOpen={isOpen}
                    setIsOpen={closeModal}
                >
                    <ConfirmModal.ModalHeader>
                        Підтвердіть реєстрацію
                    </ConfirmModal.ModalHeader>

                    <ConfirmModal.ModalBody>
                        Ви впевнені, що хочете зареєструватися з цими даними?
                    </ConfirmModal.ModalBody>
                    <ConfirmModal.ModalFooter>
                        <Button
                            onClick={handleConfirm}
                            className="rounded-full"
                        >
                            Yes
                        </Button>
                        <Button
                            variant="danger"
                            onClick={closeModal}
                            className="rounded-full"
                        >
                            No
                        </Button>
                    </ConfirmModal.ModalFooter>
                </ConfirmModal>
            </WrapperForm>
        </FormProvider>
    );
};
