import { getStyles } from "./style";

interface InputWrapperProps {
    children: React.ReactNode;
    label?: string;
    error?: string;
    required?: boolean;
}

export const InputWrapper = ({
    label,
    error,
    required,
    children,
}: InputWrapperProps) => {
    const { inputWrapper } = getStyles({ required });
    return (
        <div className={inputWrapper}>
            {label && (
                <label className="text-red-500">
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {children}

            {error && <span className="text-red-500">{error}</span>}
        </div>
    );
};
