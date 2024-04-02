import Link from 'next/link'
import { Hit, SearchParams } from './lib/pixabay/types'
import { search } from './lib/pixabay/data'
import Image from 'next/image'
import { paginationPages } from './lib/utils'

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const data = await search(searchParams)

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-5xl">{data.total} images</h1>
      <div className="columns-md gap-8 space-y-8 w-full">
        {data.hits.map((hit) => (
          <ListItem hit={hit} key={hit.id} />
        ))}
      </div>
      <Pagination searchParams={searchParams} totalHits={data.totalHits} />
    </div>
  )
}

function ListItem({ hit }: { hit: Hit }) {
  const { id, webformatURL, webformatWidth, webformatHeight } = hit
  return (
    <div className="py-4">
      <Link href={`/image/${id}`}>
        <Image
          className="w-full max-w-md mx-auto rounded"
          src={webformatURL}
          width={webformatWidth}
          height={webformatHeight}
          alt={`Image ${id}`}
        />
      </Link>
    </div>
  )
}

// adapted from nextjs dashboard tutorial
function Pagination({ searchParams, totalHits }: { searchParams: SearchParams; totalHits: number }) {
  const currentPage = Number(searchParams.page ?? 1)
  const perPage = Number(searchParams.per_page ?? 20)
  const numPages = Math.ceil(totalHits / perPage)
  const pages = paginationPages(currentPage, numPages)

  const pageLink = (page: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    return `/?${params.toString()}`
  }

  const pageClass = (page: number | string) => {
    const classes = ['join-item', 'btn']
    if (currentPage === Number(page)) {
      classes.push('btn-active')
    }
    return classes.join(' ')
  }

  return (
    <div className="join">
      {currentPage <= 1 ? (
        <button className="join-item btn btn-disabled" disabled>
          «
        </button>
      ) : (
        <Link href={pageLink(currentPage - 1)} className="join-item btn">
          «
        </Link>
      )}
      {pages.map((page, index) => {
        return page === '...' ? (
          <button key={page + index} className="join-item btn btn-disabled" disabled>
            {page}
          </button>
        ) : (
          <Link key={page} href={pageLink(page)} className={pageClass(page)}>
            {page}
          </Link>
        )
      })}
      {currentPage >= numPages ? (
        <button className="join-item btn btn-disabled" disabled>
          »
        </button>
      ) : (
        <Link href={pageLink(currentPage + 1)} className="join-item btn">
          »
        </Link>
      )}
    </div>
  )
}
