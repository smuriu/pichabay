import Link from 'next/link'
import { Hit, SearchParams } from './lib/pixabay/types'
import { search } from './lib/pixabay/data'
import { Suspense } from 'react'

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const data = await search(searchParams)

  return (
    <div className="columns-md gap-8 space-y-8 w-full">
      {/* <Suspense fallback={SkeletonItems()}> */}
      {data.hits.map((hit) => (
        <ListItem hit={hit} key={hit.id} />
      ))}
      {/* </Suspense> */}
    </div>
  )
}

function ListItem({ hit }: { hit: Hit }) {
  const { id, webformatURL, webformatWidth, webformatHeight } = hit
  return (
    <div className="py-4">
      <Link href={`/image/${id}`}>
        <img
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

function SkeletonItems() {
  const items = new Array(20).fill('')

  return (
    <>
      {items.map((_value, index) => (
        <div key={index} className="skeleton w-full max-w-md h-96"></div>
      ))}
    </>
  )
}
