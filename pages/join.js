import Head from 'next/head'
import Link from 'next/link'

import Cards from 'react-credit-cards';

import Layout from "../components/layout"
import Seo from "../components/seo"

import Announcement from "../components/announcement"

import 'react-credit-cards/es/styles-compiled.css';

// import { announcements } from "../server/models"

function patternMatch({ input, template }) {
    try {
      let j = 0;
      let plaintext = "";
      let countj = 0;
      while (j < template.length) {
        if (countj > input.length - 1) {
          template = template.substring(0, j);
          break;
        }
  
        if (template[j] == input[j]) {
          j++;
          countj++;
          continue;
        }
  
        if (template[j] == "x") {
          template =
            template.substring(0, j) + input[countj] + template.substring(j + 1);
          plaintext = plaintext + input[countj];
          countj++;
        }
        j++;
      }
  
      return template;
    } catch {
      return "";
    }
  }

export default function IndexPage ({ announcements }) {

  return <Layout>
    <Head>
      <title>Join the Charter Program</title>
    </Head>
    <form action="/api/charter/join" method="post">
        <section id="intro" className="max-w-4xl mt-16 p-4 mx-auto">
        <h1 className="text-5xl font-black">Join the Charter Program</h1>
        <p className='text-xl'>After filling out this form, we will review your application within three to five days.</p>
        </section>
        <section className="max-w-4xl mt-16 p-4 mx-auto">
            <h2 className="text-3xl font-black">School Information</h2>
            <div className='p-2'>
                <label htmlFor="school_name" className='text-lg font-bold'>School Name</label>
                <input name="school_name" placeholder="Greens Farms Academy" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-2 gap-2'>
                <div>
                    <label htmlFor="school_nces_id" className='text-lg font-bold'>NCES ID</label>
                    <input name="school_nces_id" placeholder="010000500870" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="school_type" className='text-lg font-bold'>School Type</label>
                    <select name="school_type" className='border w-full rounded-xl p-2 text-xl'>
                        <option>Public</option>
                        <option>Charter</option>
                        <option>Magnet</option>
                        <option>Private</option>
                    </select>
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                For the information above, please find the schools official name, school type, and NCES ID. This information should be obtained and verified from the administrator that signs the document.
            </p>
            <div className='p-2'>
                <label htmlFor="address_line" className='text-lg font-bold'>Address Line</label>
                <input name="address_line" placeholder="35 Beachside Ave" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-3 gap-2'>
                <div>
                    <label htmlFor="address_town" className='text-lg font-bold'>Town</label>
                    <input name="address_town" placeholder="Westport" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="address_state" className='text-lg font-bold'>State</label>
                    <input name="address_state" placeholder="Connecticut" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="address_area_code" className='text-lg font-bold'>Area Code</label>
                    <input name="address_area_code" placeholder="06880" className='border w-full rounded-xl p-2 text-xl' />
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                Above is the area for the official address of the school. This is the address listed on websites, communications, and official documents. This will also be where the package is shipped to.
            </p>
            <div className='p-2'>
                <label htmlFor="administrator_name" className='text-lg font-bold'>Administrator Name</label>
                <input name="administrator_name" placeholder="Michael Thompson" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-2 gap-2'>
                <div>
                    <label htmlFor="administrator_email" className='text-lg font-bold'>Administrator Email</label>
                    <input name="administrator_email" type="email" placeholder="thompsonm@gfacademy.org" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="administrator_position" className='text-lg font-bold'>Administrator Position</label>
                    <input name="administrator_position" placeholder="Head of Upper School" className='border w-full rounded-xl p-2 text-xl' />
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                In the above section, please enter in the name, email, and position of the administrator that is helping the charter. This administrator should review the application and understand the responsibilities of the charter.
            </p>
        </section>
        <section className="max-w-4xl mt-16 p-4 mx-auto">
        <h2 className="text-3xl font-black">Personal Information</h2>
        <div>
            <h3 className="text-2xl font-bold underline mt-4">Charter President</h3>
            <div className='p-2'>
                <label htmlFor="president_name" className='text-lg font-bold'>Full Name</label>
                <input name="president_name" placeholder="William McGonagle" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-2 gap-2'>
                <div>
                    <label htmlFor="president_email" className='text-lg font-bold'>Email</label>
                    <input name="president_email" type="email" placeholder="william@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="president_birth_date" className='text-lg font-bold'>Birth Date</label>
                    <input name="president_birth_date" type="date" className='border w-full rounded-xl p-2 text-xl' />
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                The Charter President is the leader of the charter. They schedule meetings, work with the administration, and organize volunteer opportunities for their charter members.
            </p>
        </div>
        <div>
            <h3 className="text-2xl font-bold underline mt-4">Charter Vice-President</h3>
            <div className='p-2'>
                <label htmlFor="vice_president_name" className='text-lg font-bold'>Full Name</label>
                <input name="vice_president_name" placeholder="Neil Chaudhari" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-2 gap-2'>
                <div>
                    <label htmlFor="vice_president_email" className='text-lg font-bold'>Email</label>
                    <input name="vice_president_email" type="email" placeholder="neil@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="vice_president_birth_date" className='text-lg font-bold'>Birth Date</label>
                    <input name="vice_president_birth_date" type="date" className='border w-full rounded-xl p-2 text-xl' />
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                The Charter Vice-President is the second-in-command of the charter. They invite new members, find schools to partner with, and work to make their communities better.
            </p>
        </div>
        <div>
            <h3 className="text-2xl font-bold underline mt-4">Charter Treasurer</h3>
            <div className='p-2'>
                <label htmlFor="treasurer_name" className='text-lg font-bold'>Full Name</label>
                <input name="treasurer_name" placeholder="Zoma Tessema" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div className='p-2 grid grid-cols-2 gap-2'>
                <div>
                    <label htmlFor="treasurer_email" className='text-lg font-bold'>Email</label>
                    <input name="treasurer_email" type="email" placeholder="zoma@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div>
                    <label htmlFor="treasurer_birth_date" className='text-lg font-bold'>Birth Date</label>
                    <input name="treasurer_birth_date" type="date" className='border w-full rounded-xl p-2 text-xl' />
                </div>
            </div>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                The Charter Treasurer is the third-in-command of the charter. They manage the finances, take notes during charter meetings, and organize the charter&apos;s online presence and marketing.
            </p>
        </div>
        </section>
        <section className="max-w-4xl mt-16 p-4 mx-auto">
            <input className="w-full rounded-lg p-4 font-black text-lg bg-green-300 hover:bg-green-400 hover:cursor-pointer" type="submit" value="Join the Charter Program!" />
            
            <p className='mt-4 mb-4 text-md mx-auto max-w-xl'>
                To start a charter, there is a one time payment of $50.00 USD. This charge is to cover the cost of the charter box that we ship to you once we approve your application. If your application doesn&apos;t get approved, you will be given a full refund.
            </p>
            <p className='mb-8 text-md mx-auto max-w-xl'>
                By clicking submit, you agree to the <a className='underline' href="/terms">Terms and Conditions</a> of the FPA Charter System.
            </p>
        </section>
    </form>
  </Layout>
}
