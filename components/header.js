import * as React from "react"
import Link from 'next/link'

const Header = ({ siteTitle }) => (
  <nav
    aria-label="Site Nav"
    className="mx-auto flex max-w-3xl items-center justify-between p-4"
  >
    <Link
      href="/"
      className="flex h-10 whitespace-nowrap px-4 font-bold items-center justify-center rounded-lg border"
    >
      <span className="sr-only">FPA Charter Program Logo</span>
      🎒 Charter
    </Link>

    <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">

      <li><Link className="rounded-lg px-3 py-2" href="/map"> Map </Link></li>
      <li><Link className="rounded-lg px-3 py-2" href="/charter"> Charters </Link></li>
      <li><Link className="rounded-lg px-3 py-2 font-bold border" href="/join"> Join Us</Link></li>

    </ul>
  </nav>
)

export default Header
