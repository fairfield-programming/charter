import * as React from "react"

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { Announcement } from "../../server/models"
import Head from "next/head"

export default function CharterPage ({ announcement }) {

    if (announcement == null) {

        return <Layout>
            <h1>Announcement Not Found!</h1>
        </Layout>

    }

    return <Layout>
        <Head>
            <title>{ announcement.title } • Announcement • The FPA Charter Program</title>
        </Head>
        <section className="max-w-5xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">{ announcement.title }</h1>
            <p className="my-4">{ announcement.content }</p>
        </section>
    </Layout>
}

export async function getServerSideProps() {
    
    const announcement = await Announcement.findOne({ 
        // raw: true,
        where: {
            id: 1
        }
    });

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