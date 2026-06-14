import { LogoIcon } from '@/shared/assets/img';
import { routes } from '@/shared/constants';

import Image from 'next/image';
import Link from 'next/link';

interface ILogo {
  className?: string;
}

export const Logo = ({
  className = 'w-16 h-16 tablet:w-24 tablet:h-22 mix-blend-multiply',
}: ILogo) => {
  return (
    <Link href={routes.general.home}>
      <Image alt="Logo" src={LogoIcon} className={className} />
    </Link>
  );
};
