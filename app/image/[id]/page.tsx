import { get } from '@/app/lib/pixabay/data'
import { HitDetail } from '@/app/ui/hits'

export default async function Page({
  params,
}: {
  params: {
    id: number
  }
}) {
  const data = await get(params.id)

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row justify-between">
        <HitDetail hit={data} />
      </div>
    </div>
  )
}
