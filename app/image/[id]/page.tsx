import { get } from '@/app/lib/pixabay/data'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({
  params,
}: {
  params: {
    id: number
  }
}) {
  const data = await get(params.id)
  const userLink = `https://pixabay.com/users/${data.user}-${data.user_id}/`

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row justify-between">
        <Image
          src={data.webformatURL}
          width={data.webformatWidth}
          height={data.webformatHeight}
          alt={`Image ${data.id}`}
          priority={true}
          className="w-full max-w-3xl rounded-lg shadow-2xl"
        />
        <div className="card card-compact">
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Tags</th>
                    <td>
                      <div className="flex gap-2">
                        {data.tags.split(', ').map((tag) => (
                          <span key={tag} className="badge badge-lg badge-outline">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th>Views</th>
                    <td>{data.views}</td>
                  </tr>
                  <tr>
                    <th>Comments</th>
                    <td>{data.comments}</td>
                  </tr>
                  <tr>
                    <th>Likes</th>
                    <td>{data.likes}</td>
                  </tr>
                  <tr>
                    <th>Downloads</th>
                    <td>{data.downloads}</td>
                  </tr>
                  <tr>
                    <th>Resolution</th>
                    <td>{`${data.imageWidth} x ${data.imageHeight}`}</td>
                  </tr>
                  <tr>
                    <th>Author</th>
                    <td>
                      <Link className="btn btn-outline btn-block" href={userLink} target="_blank">
                        <div className="avatar">
                          <div className="w-10 rounded-full">
                            <Image src={data.userImageURL} width="250" height="250" alt="" />
                          </div>
                        </div>
                        {data.user}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <th>Link</th>
                    <td>
                      <Link className="btn btn-outline btn-block" href={data.pageURL} target="_blank">
                        <Image
                          src={'/pixabay.svg'}
                          width={640}
                          height={124}
                          alt="pixabay"
                          className="h-6"
                          style={{ width: 'auto' }}
                        />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
