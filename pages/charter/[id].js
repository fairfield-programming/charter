import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import { Charter, Announcement as DBAnnouncement } from "../../server/models"
import Head from "next/head"

export default function CharterPage ({ charter }) {

    const [ search, setSearch ] = React.useState("");

    return <Layout>
        <Head>
            <title>{ charter.name } • The FPA Charter Program</title>
        </Head>
        <section className="max-w-5xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">{ charter.name }</h1>
            <p className="my-4">{ charter.description }</p>
            <h2 className="text-3xl font-black">Members</h2>
            <div className="grid grid-cols-3 gap-4 p-4">
                <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
                <Announcement small title="Introducing the Charter Program" short="We finally did it, we launched the charter program!" />
            </div>
            <h2 className="text-3xl font-black">Announcements</h2>
            <div className="grid grid-cols-3 gap-4 p-4">
                {
                    (charter.announcements || []).map(i => <Announcement small key={i.id} id={i.id} title={i.title.slice(0, 32) + "..."} short={i.content.slice(0, 48) + "..."} />)
                }
            </div>
        </section>
    </Layout>
}

export async function getServerSideProps() {
    // const _announcements = await announcements.findAll();
  
    const charter = await Charter.findOne({ 
        // raw: true,
        where: {
            id: 4
        },
        include: DBAnnouncement
    });

    return {
      props: {
        charter: JSON.parse(
            JSON.stringify(
                charter
            )
        )
      },
    }
  }