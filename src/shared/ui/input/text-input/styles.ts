import { cn } from '@/shared/utils';

interface IGetStyles {
  invalid?: boolean;
  className?: string;
}

export const getStyles = ({ invalid, className }: IGetStyles) => ({
  input: cn(
    'w-full bg-auth-input-bg border rounded-2xl px-5 py-3.5 text-auth-text focus:outline-none focus-visible:outline-none placeholder:text-text-muted transition-all',
    invalid
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
      : 'border-auth-input-border hover:border-brand-primary focus:border-brand-primary ',
    className
  ),
});
