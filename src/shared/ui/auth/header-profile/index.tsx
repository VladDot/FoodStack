'use client';

import { ExitIcon } from '@/shared/assets/icons';

import { signOut, useSession } from 'next-auth/react';

export const HeaderProfile = ({}) => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-amber-700" />
        <span className="text-sm font-medium hidden laptop:block">{session?.user?.email}</span>
      </div>
      <button onClick={() => signOut()} className="text-sm hover:opacity-70 transition-opacity">
        <ExitIcon className="w-5 h-5" />
      </button>
    </div>
  );
};
