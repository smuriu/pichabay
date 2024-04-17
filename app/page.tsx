import { SearchParams } from './lib/pixabay/types'
import { search } from './lib/pixabay/data'
import { Suspense } from 'react'
import SearchResult from './ui/search-result'

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const data = await search(searchParams)

  return (
    <div className="flex flex-col gap-4 p-4">
      <Suspense>
        <SearchResult result={data} />
      </Suspense>
    </div>
  )
}
