import Head from 'next/head'
import Link from 'next/link'

import Layout from "../components/layout"
import Seo from "../components/seo"

import Announcement from "../components/announcement"

import { Announcement as DBAnnouncement } from "../server/models"
import { useEffect, useState } from 'react'

export async function getServerSideProps() {
  const _announcements = await DBAnnouncement.findAll({ limit: 6 });

  return {
    props: {
      globalAnnouncements: JSON.parse(JSON.stringify(_announcements)),
    },
  }
}

export default function IndexPage ({ mainAnnouncement, globalAnnouncements }) {

  const [ localAnnouncements, setLocalAnnouncements ] = useState([]);

  useEffect(() => { 

    (async () => {

      const rawAnnouncements = await fetch('/api/announcement/local');
      const jsonAnnouncements = await rawAnnouncements.json();

      setLocalAnnouncements(jsonAnnouncements);

    })();

  }, [])

  return <Layout>
    <Head>
      <title>FPA Charter Program</title>
    </Head>
    <section id="intro" className="max-w-4xl mt-32 mb-64 p-4 mx-auto">
      <h1 class="text-3xl font-extrabold sm:text-5xl">
          Help us teach the world.
      </h1>

      <p class="mt-4 sm:text-xl sm:leading-relaxed max-w-2xl">
          With this program, you can help spread the knowledge of 
          computer science with the help of tools, resources, and friends.
      </p>
    </section>
    {/* <section className="max-w-5xl mt-16 p-4 mx-auto">
      <h2 className="text-3xl font-black">Local Announcements</h2>
      <div className="grid md:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-4 mt-8">
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
        <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
      </div>
    </section> */}
    <section className="max-w-5xl mt-16 p-4 mx-auto">
      <h2 className="text-3xl font-black">Local Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {
          (localAnnouncements || []).map(i => <Announcement small key={i.id} id={i.id} title={i.title} short={i.short} />)
        }
      </div>
    </section>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
      <h2 className="text-3xl font-black">Global Announcements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {
          (globalAnnouncements || []).map(i => <Announcement small key={i.id} id={i.id} title={i.title} short={i.short} />)
        }
      </div>
    </section>
  </Layout>
}
