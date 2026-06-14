'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';

// npm i use-debounce

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <input
      type="text"
      placeholder="Search characters..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full md:w-96 px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
    />
  );
}
