import * as React from "react"
// import Logo from '../public/fpa.svg'

const Footer = ({ siteTitle }) => (
    <footer aria-label="Site Footer" className="shadow-2xl mt-8">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://about.fairfieldprogramming.org/" className="flex justify-center text-teal-600 sm:justify-start">
          <img className="h-14" src={"/fpa.svg"} alt="The Fairfield Programming Association Logo" />
        </a>
  
        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
          Copyright &copy; { new Date().getFullYear() }. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
