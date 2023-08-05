import Head from 'next/head'
import Link from 'next/link'

import Layout from "../components/layout"
import Seo from "../components/seo"

import Announcement from "../components/announcement"

export default function IndexPage ({ announcements }) {

  return <Layout>
    <Head>
      <title>Terms and Conditions • FPA Charter Program</title>
    </Head>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
        <h2 className="text-3xl font-black">Terms and Conditions</h2>
    
    </section>
  </Layout>
}
