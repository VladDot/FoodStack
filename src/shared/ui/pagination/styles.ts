import { cn } from '@/shared/utils';

interface IGetStyles {
  isCurrent: boolean;
}

export const getStyles = ({ isCurrent }: IGetStyles) => ({
  pageButton: cn(
    'px-3 py-2 rounded transition bg-zinc-800 hover:bg-zinc-700 text-white',
    isCurrent && 'bg-emerald-500 hover:bg-emerald-500 font-bold'
  ),
});
