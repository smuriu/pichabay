'use client'

import { FormEvent } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ImageCategories, ImageTypes } from '../lib/pixabay/types'
import { titleCase } from '../lib/utils'

export default function SearchForm() {
  const searchParams = useSearchParams()
  const { push } = useRouter()

  const handleSearch = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const data = new FormData(form)
    const params = new URLSearchParams(searchParams)
    if (params.has('page')) {
      params.set('page', '1')
    }
    for (const [key, val] of data.entries()) {
      if (val) {
        params.set(key, val.toString())
      } else {
        params.delete(key)
      }
    }

    push(`/?${params.toString()}`)
  }

  return (
    <form className="contents" onSubmit={handleSearch}>
      <div className="join">
        <input
          className="input input-bordered join-item"
          placeholder="Search"
          name="q"
          defaultValue={searchParams.get('q')?.toString()}
        />
        <select className="select select-bordered join-item" name="image_type">
          <option disabled>Image Type</option>
          {ImageTypes.map((val) => (
            <option key={val} value={val}>
              {titleCase(val)}
            </option>
          ))}
        </select>
        <select className="select select-bordered join-item" name="category">
          <option value={''}>All Categories</option>
          {ImageCategories.map((val) => (
            <option key={val} value={val}>
              {titleCase(val)}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" type="submit">
        Search
      </button>
    </form>
  )
}
