import { type Hits, SearchSchema, SearchParams } from './types'
import 'server-only'

// basic api client
async function pixafetch(query: Record<string, string>) {
  const key = process.env.PIXABAY_KEY
  if (!key) {
    throw new Error('Missing pixabay key')
  }
  const params = new URLSearchParams(query)
  params.set('key', key)

  const res = await fetch(`https://pixabay.com/api/?${params.toString()}`, {
    // cache result for at least 24hrs per pixabay constraints
    next: { revalidate: 24 * 60 * 60 },
  })

  const data = await res.json()
  return data as Hits
}

export async function search(query: SearchParams) {
  const parsed = SearchSchema.safeParse(query)
  if (!parsed.success) {
    throw parsed.error
  }

  const data = await pixafetch(query)
  return data
}

// retrieve a single item by id
export async function get(id: number) {
  const query = {
    id: id.toString(),
  }

  const data = await pixafetch(query)
  return data.hits[0]
}
