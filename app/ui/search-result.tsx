'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { HitDetail } from './hits'
import { Hits, SearchSchema, SearchParams, Hit } from '@/app/lib/pixabay/types'
import { paginationPages } from '@/app/lib/utils'

// todo: figure out how to use `swiper/element/bundle` instead with proper typing
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

function useParsedSearchParams(): SearchParams {
  const rawSearchParams = useSearchParams()
  const parsed = SearchSchema.safeParse(rawSearchParams)
  return parsed.success ? parsed.data : {}
}

function ResultDialog({
  hits,
  currentHitId,
  onDialogClose,
}: {
  hits: Hit[]
  currentHitId: number | null
  onDialogClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const swiperRef = useRef<SwiperRef>(null)

  useEffect(() => {
    if (currentHitId !== null) {
      const index = hits.findIndex(({ id }) => currentHitId === id)
      swiperRef.current?.swiper.slideTo(index, 500)
      if (dialogRef.current && !dialogRef.current.open) {
        dialogRef.current.showModal()
      }
    }
  }, [hits, currentHitId])

  return (
    <dialog ref={dialogRef} onClose={onDialogClose} className="modal">
      <div className="modal-box w-full max-w-screen-2xl">
        <div className="modal-action">
          <Link href={`/image/${currentHitId}`} className="btn">
            Permalink
          </Link>
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>

        <Swiper ref={swiperRef} modules={[Navigation]} autoHeight={true} navigation={true}>
          {hits.map((hit) => (
            <SwiperSlide key={hit.id} className="max-w-full">
              <div className="flex flex-col lg:flex-row items-center justify-center">
                <HitDetail hit={hit} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* todo: add thumbnails for nav */}
      </div>
    </dialog>
  )
}

function SearchHit({ hit, onHitClicked }: { hit: Hit; onHitClicked: () => void }) {
  const { id, webformatURL, webformatWidth, webformatHeight } = hit
  return (
    <div className="py-4">
      <Image
        className="w-full max-w-md mx-auto rounded cursor-pointer"
        src={webformatURL}
        width={webformatWidth}
        height={webformatHeight}
        alt={`Image ${id}`}
        onClick={onHitClicked}
      />
    </div>
  )
}

function Pagination({ totalHits }: { totalHits: number }) {
  const searchParams = useParsedSearchParams()
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

export default function SearchResult({ result }: { result: Hits }) {
  const [currentHitId, setCurrentHitId] = useState<number | null>(null)

  return (
    <>
      <h1 className="text-5xl">{result.total} images</h1>
      <div className="columns-md gap-8 space-y-8 w-full">
        {result.hits.map((hit) => (
          <SearchHit hit={hit} key={hit.id} onHitClicked={() => setCurrentHitId(hit.id)} />
        ))}
      </div>
      <ResultDialog hits={result.hits} currentHitId={currentHitId} onDialogClose={() => setCurrentHitId(null)} />
      <Pagination totalHits={result.totalHits} />
    </>
  )
}
