import { getStyles } from './style';

interface InputWrapperProps {
  error?: string;
  label?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const InputWrapper = ({ label, error, required, children }: InputWrapperProps) => {
  const { inputWrapper, labelStyles } = getStyles({ error });

  return (
    <div className={inputWrapper}>
      {label && (
        <label className={labelStyles}>
          {label}
          {required && <span className={labelStyles}>*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
