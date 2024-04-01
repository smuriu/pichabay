import Link from "next/link"

export default function Navbar() {
  return (
    <div className="navbar">
      <Link className="btn btn-ghost text-xl" href={'/'}>pichabay</Link>
    </div>
  )
}