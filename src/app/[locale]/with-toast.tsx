'use client';

import { ChildrenProps } from '@/shared/types';
import { Toast } from '@/shared/ui';

export const WidthToast = ({ children }: ChildrenProps) => {
  return (
    <>
      {children}
      <Toast
        limit={5}
        draggable
        rtl={false}
        closeOnClick
        pauseOnHover
        autoClose={3000}
        pauseOnFocusLoss
        newestOnTop={false}
        position="top-right"
        hideProgressBar={false}
      />
    </>
  );
};
