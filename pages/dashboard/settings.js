import Head from 'next/head'
import Link from 'next/link'

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import { useCookies } from "react-cookie"

import Announcement from "../../components/announcement"
import Tabbar from '../../components/tabbar'

export default function IndexPage ({  }) {

  const [ cookie, setCookie, removeCookie ] = useCookies(["token"])

  return <Layout auth>
    <Head>
      <title>Dashboard • FPA Charter Program</title>
    </Head>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
        <h1 className="text-5xl font-black">Dashboard</h1>
        <p className="my-4">Manage your charter, find new connections, grow your learning.</p>
    </section>
    <Tabbar pages={[ { 
        text: "Overview", 
        url: "/dashboard",
        icon: <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 flex-shrink-0 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
    </svg>
      }, { 
        text: "Tools", 
        url: "/dashboard/tools",
        icon:  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>      
      }, { 
        text: "User Settings", 
        url: "/dashboard/settings",
        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-gray-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>      
      } ]} />
      <section className='p-4 w-full'>
        <div className='border rounded-xl p-4 max-w-xl mx-auto my-2'>
          <h2 className='text-xl font-bold'>Display Name and Biography</h2>
          <p className='text-sm'>Your name and biography show up on your account page. You can edit them below. </p>
          <label className='w-full block font-bold mt-4'>Full Name</label>
          <input className='w-full p-2 border rounded mb-2' value={'testing'} />
          <label className='w-full block font-bold mt-4'>Biography</label>
          <textarea className='w-full p-2 border rounded mb-2' />
          <div className='w-full flex items-center justify-end'>
            <button className='p-2 bg-green-600 hover:bg-green-500 text-white rounded-md px-4'>Save Data</button>
          </div>
        </div>
        <div className='border rounded-xl p-4 max-w-xl mx-auto my-2'>
          <h2 className='text-xl font-bold'>Change Password</h2>
          <p className='text-sm'>To change your password, please enter your current password and new password twice. </p>
          <label className='w-full block font-bold mt-4'>Current Password</label>
          <input type="password" className='w-full p-2 border rounded mb-2' value={'testing'} />
          <div className='flex flex-row w-full gap-2'>
            <div className='w-full'>
              <label className='w-full block font-bold mt-4'>New Password</label>
              <input type="password" className='w-full p-2 border rounded mb-2' value={'testing'} />
            </div>
            <div className='w-full'>
              <label className='w-full block font-bold mt-4'>Reenter New Password</label>
              <input type="password" className='w-full p-2 border rounded mb-2' value={'testing'} />
            </div>
          </div>
          <div className='w-full flex items-center justify-end'>
            <button className='p-2 bg-green-600 hover:bg-green-500 text-white rounded-md px-4'>Change Password</button>
          </div>
        </div>
        <div className='border rounded-xl p-4 max-w-xl mx-auto my-2'>
          <h2 className='text-xl font-bold'>Logout</h2>
          <p className='text-sm'>To exit your account, just press the button below.</p>

          <div className='w-full flex items-center justify-end'>
            <button onClick={() => { removeCookie(['token']); removeCookie(['id']); window.location.href = "/"; }} className='p-2 bg-red-600 hover:bg-red-500 text-white rounded-md px-4'>Logout of Session</button>
          </div>
        </div>
      </section>
  </Layout>
}
