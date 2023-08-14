import * as React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import {Elements, PaymentElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import 'react-credit-cards/es/styles-compiled.css';
import SchoolSelect from '../../components/schoolSelect';
import PaymentForm from '../../components/paymentForm';

import { useSearchParams } from 'next/navigation'
// import { useRouter } from 'next/router'

// import { announcements } from "../server/models"

const stripePromise = loadStripe('pk_test_51LKrcgHSFWYfEtuCLLkBpluEBpnCKwLfG5kwEm6IOr0kdNgPj6xyHvWK7FYCeUELQ9aonDMAbPCKxbm8GsHwHAhW00F9lXuUAi');

export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default function PaymentPage ({  }) {

    const searchParams = useSearchParams()
    const website = searchParams.get('website') || "https://gfacademy.org"
    const amount = searchParams.get('amount') || 0

    const options = {
        // passing the client secret obtained from the server
        clientSecret: searchParams.get('secret')
    };

    const [ charterLogoDisplay, setCharterLogoDisplay ] = React.useState(`https://logo.clearbit.com/${website}`)
    const [ charterBannerDisplay, setCharterBannerDisplay ] = React.useState("")

    React.useEffect(() => {

        (async () => {

            const req = await fetch(`http://localhost:3000/api/school/banner?website=${website}`)
            const data = await req.json()

            if (data.length == 0) return
            setCharterBannerDisplay(data[0].url)

        })();

    }, [])

    // console.log(JSON.stringify(searchParams))

    return <Layout>
        <Head>
        <title>Join the Charter Program</title>
        </Head>
        <form onSubmit={(e) => { submitForm(); e.preventDefault(); return false }} onKeyDown={(e) => { if (e.code === 13) { e.preventDefault(); } }}>
            <section id="intro" className="max-w-4xl mt-16 p-4 mx-auto">
            <h1 className="text-5xl font-black">Join the Charter Program</h1>
            <p className='text-xl'>After filling out this form, we will review your application within three to five days.</p>
            </section>
            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <h2 className="text-3xl font-black">Charter Logo</h2>
                <p className='mb-8 text-md'>Each charter needs a logo to represent themselves with, please upload a new logo if the current one doesn't fit the requirements. <a className="hover:underline" href="https://clearbit.com">Logos provided by Clearbit</a>.</p>
                <div className='flex flex-row'>
                    <div className='w-full flex content-center justify-center'>
                        <div className='aspect-square w-full max-w-[180px] relative shadow rounded-xl overflow-hidden'>
                            <label className='absolute hover:cursor-pointer w-full h-full transition-opacity hover:opacity-60 opacity-0 bg-black' htmlFor="logoUpload">
                                <svg className='w-full h-full p-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                                <input className='hidden' type="file" id="logoUpload" />
                            </label>
                            <img className='w-full h-full object-cover' src={charterLogoDisplay} alt="Charter Logo" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='underline'>This image...</p>
                        <div className='px-1'>
                            <input id="check1" className='m-2' type="checkbox" />
                            <label for="check1">represents my highschool.</label>
                        </div>
                        <div className='px-1'>
                            <input id="check2" className='m-2' type="checkbox" />
                            <label for="check2">is a high resolution.</label>
                        </div>
                        <div className='px-1'>
                            <input id="check3" className='m-2' type="checkbox" />
                            <label for="check3">is appropriate for children.</label>
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <h2 className="text-3xl font-black">Charter Banner</h2>
                <p className='mb-8 text-md'>This is the banner image that is shown on your charters homepage. You can upload a different one if you'd like, but for now, it is an image we took from your schools website.</p>
                <div className='flex flex-row'>
                    <div className='w-full flex content-center justify-center'>
                        <div className='aspect-video w-full max-w-lg relative shadow rounded-xl overflow-hidden'>
                            <label className='absolute hover:cursor-pointer w-full h-full transition-opacity hover:opacity-60 opacity-0 bg-black' htmlFor="logoUpload">
                                <svg className='w-full h-full p-8' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-upload" viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                                </svg>
                                <input className='hidden' type="file" id="logoUpload" />
                            </label>
                            <img className='w-full h-full object-cover' src={charterBannerDisplay} alt="Charter Banner" />
                        </div>
                    </div>
                </div>
            </section>
            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <h2 className="text-3xl font-black">Charter Payment</h2>
                <p className='mb-8 text-md'>
                    We calculated the cost of starting your charter to be ${(amount / 100).toFixed(2)}. This is due to the location, 
                    number of members, and cost of materials at this time. If you are unable to form a charter 
                    because of economic conditions, please contact us.
                </p>
                <Elements stripe={stripePromise} options={options}>
                    <PaymentElement />
                </Elements>
            </section>

            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <input onClick={() => { submitForm() }} className="w-full rounded-lg p-4 font-black text-lg bg-green-300 hover:bg-green-400 hover:cursor-pointer" type="submit" value="Form my Charter!" />
                <p className='mt-4 mb-8 text-md mx-auto max-w-xl'>
                    By clicking submit, you once again agree to the <Link className='underline' href="/terms">Terms and Conditions</Link> of the FPA Charter System.
                </p>
            </section>
        </form>
    </Layout>
}
