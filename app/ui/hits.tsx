import Image from 'next/image'
import Link from 'next/link'
import { Hit } from '../lib/pixabay/types'

export function HitDetail({ hit }: { hit: Hit }) {
  const userLink = `https://pixabay.com/users/${hit.user}-${hit.user_id}/`
  return (
    <>
      <Image
        src={hit.webformatURL}
        width={hit.webformatWidth}
        height={hit.webformatHeight}
        alt={`Image ${hit.id}`}
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
                      {hit.tags.split(', ').map((tag) => (
                        <span key={tag} className="badge badge-lg badge-outline">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Views</th>
                  <td>{hit.views}</td>
                </tr>
                <tr>
                  <th>Comments</th>
                  <td>{hit.comments}</td>
                </tr>
                <tr>
                  <th>Likes</th>
                  <td>{hit.likes}</td>
                </tr>
                <tr>
                  <th>Downloads</th>
                  <td>{hit.downloads}</td>
                </tr>
                <tr>
                  <th>Resolution</th>
                  <td>{`${hit.imageWidth} x ${hit.imageHeight}`}</td>
                </tr>
                <tr>
                  <th>Author</th>
                  <td>
                    <Link className="btn btn-outline btn-block" href={userLink} target="_blank">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <Image src={hit.userImageURL} width="250" height="250" alt="" />
                        </div>
                      </div>
                      {hit.user}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <th>Link</th>
                  <td>
                    <Link className="btn btn-outline btn-block" href={hit.pageURL} target="_blank">
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
    </>
  )
}

export function HitThumb({ hit }: { hit: Hit }) {
  const { id, previewURL, previewWidth, previewHeight } = hit
  return (
    <Image
      className="rounded cursor-pointer"
      src={previewURL}
      width={previewWidth}
      height={previewHeight}
      alt={`thumb ${id}`}
    />
  )
}
