import * as React from "react"

import Head from "next/head"
import { useRouter } from 'next/router'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import { User } from "../../server/models"
import UserIcon from "../../components/user"

export default function CharterPage ({ user }) {

    return <Layout>
        <Head>
            <title>{ user.full_name } • User • The FPA Charter Program</title>
        </Head>
        <section className="max-w-5xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">{ user.full_name }</h1>
            <p className="my-4">{ user.description }</p>
        </section>
    </Layout>
}

export async function getServerSideProps({ query }) {
    const { id } = query 

    const user = await User.findOne({ 
        where: {
            id
        }
    });

    if (user == null) return {
        notFound: true,
      }

    return {
      props: {
        user: JSON.parse(
            JSON.stringify(
                user
            )
        )
      },
    }
  }