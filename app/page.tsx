import Link from "next/link";
import { Hit, SearchParams } from "./lib/pixabay/types";
import { search } from "./lib/pixabay/data";

export default async function Home({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const data = await search(searchParams)

  return (
    <div className="columns-md gap-8 space-y-8 w-full">
      {data.hits.map((hit) => <Item hit={hit} key={hit.id} />)}
    </div>
  )
}

function Item({ hit }: { hit: Hit }) {
  const { id, webformatURL, webformatWidth, webformatHeight } = hit
  return (
    <div className='py-4'>
      <Link href={`/image/${id}`}>
        <img
          className='w-full max-w-md mx-auto rounded'
          src={webformatURL}
          width={webformatWidth}
          height={webformatHeight}
          alt={`Image ${id}`}
        />
      </Link>
    </div>
  );
}