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
    <section id="intro" className="max-w-4xl mt-16 p-4 mx-auto">
      <h1 className="text-5xl font-black">Join the Charter Program</h1>
      <p className='text-xl'>After filling out this form, we will review your application within three to five days.</p>
    </section>
    <section className="max-w-4xl mt-16 p-4 mx-auto">
        <h2 className="text-3xl font-black">School Information</h2>
        <div className='p-2'>
            <label for="school_name" className='text-lg font-bold'>School Name</label>
            <input id="school_name" placeholder="Greens Farms Academy" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>NCES ID</label>
                <input id="school_nces_id" placeholder="010000500870" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>School Type</label>
                <select id="school_type" className='border w-full rounded-xl p-2 text-xl'>
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
            <label for="school_name" className='text-lg font-bold'>Address Line</label>
            <input id="school_name" placeholder="35 Beachside Ave" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-3 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>Town</label>
                <input id="school_nces_id" placeholder="Westport" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>State</label>
                <input id="school_nces_id" placeholder="Connecticut" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>Area Code</label>
                <input id="school_nces_id" placeholder="06880" className='border w-full rounded-xl p-2 text-xl' />
            </div>
        </div>
        <p className='mb-8 text-md mx-auto max-w-xl'>
            Above is the area for the official address of the school. This is the address listed on websites, communications, and official documents. This will also be where the package is shipped to.
        </p>
        <div className='p-2'>
            <label for="school_name" className='text-lg font-bold'>Administrator Name</label>
            <input id="school_name" placeholder="Michael Thompson" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>Administrator Email</label>
                <input id="school_nces_id" type="email" placeholder="thompsonm@gfacademy.org" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>Administrator Position</label>
                <input id="school_nces_id" placeholder="Head of Upper School" className='border w-full rounded-xl p-2 text-xl' />
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
            <label for="school_name" className='text-lg font-bold'>Full Name</label>
            <input id="school_name" placeholder="William McGonagle" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>Email</label>
                <input id="school_nces_id" type="email" placeholder="william@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>Birth Date</label>
                <input id="school_nces_id" type="date" className='border w-full rounded-xl p-2 text-xl' />
            </div>
        </div>
        <p className='mb-8 text-md mx-auto max-w-xl'>
            The Charter President is the leader of the charter. They schedule meetings, work with the administration, and organize volunteer opportunities for their charter members.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold underline mt-4">Charter Vice-President</h3>
        <div className='p-2'>
            <label for="school_name" className='text-lg font-bold'>Full Name</label>
            <input id="school_name" placeholder="Neil Chaudhari" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>Email</label>
                <input id="school_nces_id" type="email" placeholder="neil@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>Birth Date</label>
                <input id="school_nces_id" type="date" className='border w-full rounded-xl p-2 text-xl' />
            </div>
        </div>
        <p className='mb-8 text-md mx-auto max-w-xl'>
            The Charter Vice-President is the second-in-command of the charter. They invite new members, find schools to partner with, and work to make their communities better.
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-bold underline mt-4">Charter Treasurer</h3>
        <div className='p-2'>
            <label for="school_name" className='text-lg font-bold'>Full Name</label>
            <input id="school_name" placeholder="Zoma Tessema" className='border w-full rounded-xl p-2 text-xl' />
        </div>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <label for="school_nces_id" className='text-lg font-bold'>Email</label>
                <input id="school_nces_id" type="email" placeholder="zoma@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
            </div>
            <div>
                <label for="school_type" className='text-lg font-bold'>Birth Date</label>
                <input id="school_nces_id" type="date" className='border w-full rounded-xl p-2 text-xl' />
            </div>
        </div>
        <p className='mb-8 text-md mx-auto max-w-xl'>
            The Charter Treasurer is the third-in-command of the charter. They manage the finances, take notes during charter meetings, and organize the charter's online presence and marketing.
        </p>
      </div>
    </section>
    <section className="max-w-4xl mt-16 p-4 mx-auto">
        <h2 className="text-3xl font-black">Payment Information</h2>
        <div className='p-2 grid grid-cols-2 gap-2'>
            <div>
                <div>
                    <label for="card_owner" className='text-lg font-bold'>Card Owner</label>
                    <input id="card_owner" placeholder="William McGonagle" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='mt-2'>
                    <label for="card_number" className='text-lg font-bold'>Card Number</label>
                    <input id="card_number" placeholder="**** **** **** ****" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='mt-2 grid grid-cols-2 gap-2'>
                    <div>
                        <label for="school_nces_id" className='text-lg font-bold'>CVC</label>
                        <input id="school_nces_id" type="email" placeholder="143" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div>
                        <label for="card_expiration" className='text-lg font-bold'>Expiration Date</label>
                        <input id="card_expiration" placeholder="4/24" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                </div>
            </div>
            <div className='relative flex items-center justify-center'>
                <Cards
                    cvc={"818"}
                    expiry={"4/24"}
                    focused={"cv"}
                    name={"William McGonagle"}
                    number={"4400 6608 3824 2017"}
                />
            </div>
        </div>
        <p className='mb-8 text-md mx-auto max-w-xl'>
            To start a charter, there is a one time payment of $50.00 USD. This charge is to cover the cost of the charter box that we ship to you once we approve your application. If your application doesn't get approved, you will be given a full refund.
        </p>
    </section>
  </Layout>
}
