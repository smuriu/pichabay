export function titleCase(str: string) {
  if (!str) {
    return ''
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase())
}

// copied from nextjs dashboard tutorial
export function paginationPages(currentPage: number, lastPage: number) {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (lastPage <= 7) {
    return Array.from({ length: lastPage }, (_, i) => i + 1)
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', lastPage - 1, lastPage]
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= lastPage - 2) {
    return [1, 2, '...', lastPage - 2, lastPage - 1, lastPage]
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage]
}
