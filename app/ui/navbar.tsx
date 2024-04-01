import Link from "next/link"
import SearchForm from "./search-form"

export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="btn btn-ghost text-xl" href={'/'}>pichabay</Link>
      <SearchForm />
    </div>
  )
}