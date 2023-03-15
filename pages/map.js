import * as React from "react"

import dynamic from "next/dynamic"
import Head from "next/head"

import Layout from "../components/layout"
import Seo from "../components/seo"

const MapContainer = dynamic(() => import("../components/mapContainer"), { ssr:false })

const IndexPage = () => {

    const [ charters, setCharters ] = React.useState([]);
    
    React.useEffect(() => {

        (async () => {

            const raw = await fetch('/api/charter');
            const json = await raw.json();
    
            setCharters(json);

        })();

    }, [ ])

    return <Layout>
        <Head>
            <title>FPA Charter Map</title>
        </Head>
        <div className="mx-auto w-max-xl aspect-video border">
            <MapContainer charters={charters} />
        </div>
    </Layout>
}

export default IndexPage
