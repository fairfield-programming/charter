import Head from 'next/head'
import Link from 'next/link'

import Layout from "../components/layout"
import Seo from "../components/seo"

import Announcement from "../components/announcement"

// import { announcements } from "../server/models"

export async function getServerSideProps() {
  // const _announcements = await announcements.findAll();

  return {
    props: {
      // announcements: _announcements,
    },
  }
}

export default function IndexPage ({ announcements }) {

  return <Layout>
    <Head>
      <title>FPA Charter Program</title>
    </Head>
    <section id="intro" className="max-w-4xl mt-16 p-4 mx-auto">
      <Announcement title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
    </section>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
      <h2 className="text-3xl font-black">Local Announcements</h2>
      <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-4 mt-8">
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
      </div>
    </section>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
      <h2 className="text-3xl font-black">Global Announcements</h2>
      <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-4 mt-8">
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
      </div>
    </section>
  </Layout>
}
