import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Link from "next/link"

import { Announcement, User as DBUser, Charter as DBCharter } from "../../server/models"
import Head from "next/head"

export default function CharterPage ({ announcement }) {

    announcement.content = announcement.content.replace(/<\s*script/g, '');

    return <Layout>
        <Head>
            <title>{ announcement.title } • Announcement • The FPA Charter Program</title>
        </Head>
        <section className="max-w-5xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">{ announcement.title }</h1>
            <Link href={`/user/${announcement.user.id}`} className="w-full flex flex-row h-12 items-center justify-start gap-2 hover:underline hover:cursor-pointer">
                <img className="aspect-square h-full rounded-lg border-2 border-white shadow" src={announcement.user.profilePicture} />
                <span className="text-bold">{announcement.user.full_name}</span>
            </Link>
            <p className="my-4" dangerouslySetInnerHTML={{ __html: announcement.content }} />
        </section>
    </Layout>
}

export async function getServerSideProps({ query }) {
    
    const { id } = query 

    const announcement = await Announcement.findOne({ 
        // raw: true,
        where: {
            id
        },
        include: [
            DBUser,
            DBCharter
        ]
    });

    if (announcement == null) return {
        notFound: true,
      }
      
    return {
      props: {
        announcement: JSON.parse(
            JSON.stringify(
                announcement
            )
        )
      },
    }
  }