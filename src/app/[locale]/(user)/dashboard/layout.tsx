import { ChildrenProps } from '@/shared/types';

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="scroll-blue flex h-screen flex-col overflow-y-auto bg-amber-400">
      <main className="grow">{children}</main>
    </div>
  );
}
