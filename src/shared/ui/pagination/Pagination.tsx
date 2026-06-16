import Link from 'next/link';

import { getStyles } from './styles';
import { PaginationProps } from './types';

export function Pagination({
  pathname,
  totalPages,
  query = '',
  currentPage,
  locale = 'en',
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getPageLink = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.append('query', query);
    params.append('page', page.toString());
    return `/${locale}/${pathname}?${params.toString()}`;
  };

  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 mt-8">
      {hasPrev && (
        <Link
          href={getPageLink(currentPage - 1)}
          className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
        >
          ← Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            href={getPageLink(1)}
            className="px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-zinc-500">...</span>}
        </>
      )}

      {pages.map((page) => {
        const isCurrent = page === currentPage;
        const { pageButton } = getStyles({ isCurrent });

        return (
          <Link
            key={page}
            className={pageButton}
            href={getPageLink(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isCurrent ? 'page' : undefined}
          >
            {page}
          </Link>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-zinc-500" aria-hidden="true">
              ...
            </span>
          )}
          <Link
            href={getPageLink(totalPages)}
            className="px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-white transition"
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {hasNext && (
        <Link
          aria-label="Go to next page"
          href={getPageLink(currentPage + 1)}
          className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
