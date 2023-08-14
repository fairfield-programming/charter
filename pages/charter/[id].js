import * as React from "react"

import Head from "next/head"
import { useRouter } from 'next/router'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import { Charter, Announcement as DBAnnouncement, User as DBUser } from "../../server/models"
import UserIcon from "../../components/user"

export default function CharterPage ({ charter }) {

    const [ search, setSearch ] = React.useState("");

    const data = JSON.stringify(charter.data)

    return <Layout>
        <Head>
            <title>{ charter.name } • The FPA Charter Program</title>
        </Head>
        <section className="max-w-5xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">{ charter.name }</h1>
            <p className="my-4">{ charter.description }</p>
            <p>{ data }</p>
            {
                    (charter.users || []).length > 0 ? <>
                    <h2 className="text-3xl font-black">Members</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 p-4">
                        {
                            (charter.users || []).map(i => <UserIcon id={i.id} key={i.id} profilePhoto={i.profilePhoto} name={i.full_name} />)
                        }
                    </div>
                </> : <></>
            }
            {
                (charter.announcements || []).length > 0 ? <>
                <h2 className="text-3xl font-black">Announcements</h2>
                <div className="grid grid-cols-2 gap-4 p-4">
                    {
                        (charter.announcements || []).map(i => <Announcement small key={i.id} id={i.id} title={i.title} short={i.short} />)
                    }
                </div>
                </> : <></>
            }
        </section>
    </Layout>
}

export async function getServerSideProps({ query }) {
    // const _announcements = await announcements.findAll();

    const { id } = query 

    const charter = await Charter.findOne({ 
        // raw: true,
        where: {
            id
        },
        include: [ DBAnnouncement, DBUser ]
    });

    if (charter == null) return {
        notFound: true,
      }

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