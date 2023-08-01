/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"

import { useCookies } from "react-cookie"

import Header from "./header"
import Footer from "./footer"

const Layout = ({ auth, children }) => {

  const [ cookie, setCookie ] = useCookies(["token"])
  const [ _auth, setAuth ] = React.useState();

  React.useEffect(() => {

    setAuth(cookie.token != undefined);

  }, [ cookie.token ])

  if (typeof window == 'undefined') return (
    <>
      <Header auth={auth} />
        <main className="min-h-screen">
          {children}
        </main>
      <Footer />
    </>
  )

  if (auth && cookie.token == undefined) window.location.href = '/';

  return (
    <>
      <Header auth={auth || _auth} />
        <main className="min-h-screen">
          {children}
        </main>
      <Footer />
    </>
  )
}

export default Layout
