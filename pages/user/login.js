import * as React from "react"

import { useCookies } from "react-cookie"

import Head from "next/head"
import Link from "next/link"
import { useRouter } from 'next/router'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import UserIcon from "../../components/user"

async function submitLoginForm(e, email, password, setCookie) {

    const responseRaw = await fetch('/api/user/login', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            email,
            password
        })
    });

    const responseJson = await responseRaw.json();

    if (responseJson.error) alert(responseJson.error);

    setCookie("token", responseJson.token, { path: '/' });
    setCookie("id", responseJson.id, { path: '/' });
    window.location.href = '/dashboard';

}

export default function CharterPage ({  }) {

    const [ email, setEmail ] = React.useState("");
    const [ password, setPassword ] = React.useState("");

    const [ cookie, setCookie ] = useCookies(["token"]);

    if (cookie.token != undefined && typeof window != 'undefined') {

        window.location.href = '/dashboard';

    }

    return <>
            <Head>
                <title>User Login • The FPA Charter Program</title>
            </Head>
            <section class="bg-white">
                <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
                    <section
                    class="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
                    >
                    <img
                        alt="Night"
                        src="/ajl_spread.jpeg"
                        class="absolute inset-0 h-full w-full object-cover opacity-20"
                    />

                    <div class="hidden lg:relative lg:block lg:p-12">
                        <Link class="block text-white" href="/">
                        <span class="sr-only">Home</span>
                            <img className="h-10 sm:h-16" src="/logo_white.svg" alt="White FPA Logo" />
                        </Link>

                        <h2 class="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                        Welcome Back!
                        </h2>

                        <p class="mt-4 leading-relaxed text-white/90">
                        Login to the charter platform by using the email and password combination 
                        you created when setting up your charter.
                        </p>
                    </div>
                    </section>

                    <main
                    aria-label="Main"
                    class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6"
                    >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                        <Link
                            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 sm:h-20 sm:w-20"
                            href="/"
                        >
                            <span className="sr-only">Home</span>
                            <img className="h-12 sm:h-12" src="/logo_dark.svg" alt="White FPA Logo" />
                        </Link>

                        <h1
                            class="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                        >
                            Welcome Back!
                        </h1>

                        <p class="mt-4 leading-relaxed text-gray-500">
                            Login to the charter platform by using the email and password combination 
                            you created when setting up your charter.
                        </p>
                        </div>

                        <form onSubmit={(e) => { submitLoginForm(e, email, password, setCookie); e.preventDefault(); return false; }} action="/api/user/login" method="post" class="mt-8 grid grid-cols-6 gap-6">
                        
                        <div class="col-span-6">
                            <label forHtml="Email" class="block text-sm font-medium text-gray-700">
                            Email
                            </label>

                            <input
                                type="email"
                                id="Email"
                                name="email"
                                value={email}
                                onInput={(e) => { setEmail(e.target.value) }}
                                class="mt-1 border p-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div class="col-span-6">
                            <label forHtml="Email" class="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <input
                            type="password"
                            id="Password"
                            name="password"
                            value={password}
                            onInput={(e) => { setPassword(e.target.value) }}
                            class="mt-1 border p-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>

                        <div class="col-span-6">
                            <label for="MarketingAccept" class="flex gap-4">
                                <input
                                    type="checkbox"
                                    id="MarketingAccept"
                                    name="marketing_accept"
                                    class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                                />

                                <span class="text-sm text-gray-700">
                                    Remember my details on future logins.
                                </span>
                            </label>
                        </div>

                        <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                            class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            >
                            Log In
                            </button>

                        </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    </>
}
