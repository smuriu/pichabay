import Link from 'next/link'
import SearchForm from './search-form'

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href={'/'}>
          pichabay
        </Link>
      </div>
      <div className="flex-none gap-2">
        <SearchForm />
      </div>
    </div>
  )
}
