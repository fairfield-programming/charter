import * as React from "react"
import Link from 'next/link'
import Logo from '../public/logo.svg'
import Image from 'next/image';

const Header = ({ auth }) => (

  auth ?

  // Logged In

  <nav
    aria-label="Site Nav"
    className="mx-auto flex max-w-3xl items-center justify-between p-4"
  >
    <Link
      href="/"
      className="flex p-1 h-12 whitespace-nowrap font-bold items-center justify-center rounded-lg border"
    >
      <span className="sr-only">FPA Charter Program Logo</span>
      <Image className="h-full w-min" src={Logo} alt="FPA Charter Program Logo" priority />
      <div className="flex flex-col">
        <span className="font-black text-sm p-0 m-0 leading-4">Hi, William!</span>
        <span className="font-light text-xs p-0 m-0 leading-3">Greens Farms Academy</span>
      </div>
    </Link>

    <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
      <li><Link className="rounded-lg px-3 py-2" href="/map"> Map </Link></li>
      <li><Link className="rounded-lg px-3 py-2" href="/charter"> Charters </Link></li>
      <li><Link className="rounded-lg px-3 py-2 font-bold border" href="/dashboard"> Dashboard</Link></li>
    </ul>
  </nav>

  :

  // Not Logged In 

  <nav
    aria-label="Site Nav"
    className="mx-auto flex max-w-3xl items-center justify-between p-4"
  >
    <Link
      href="/"
      className="flex h-10 whitespace-nowrap px-4 font-bold items-center justify-center rounded-lg border"
    >
      <span className="sr-only">FPA Charter Program Logo</span>
      <Image className="h-4/5 w-min m-0 mr-1 p-0" src={Logo} alt="FPA Charter Program Logo" priority /> Charter
    </Link>

    <ul className="flex items-center gap-2 text-sm font-medium text-gray-500">
      <li><Link className="rounded-lg px-3 py-2" href="/map"> Map </Link></li>
      <li><Link className="rounded-lg px-3 py-2" href="/charter"> Charters </Link></li>
      <li><Link className="rounded-lg px-3 py-2 font-bold border" href="/join"> Join Us</Link></li>
    </ul>
  </nav>

)

export default Header
