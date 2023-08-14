import * as React from 'react'

import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/navigation'

// import Cards from 'react-credit-cards';

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"

import 'react-credit-cards/es/styles-compiled.css';
import SchoolSelect from '../../components/schoolSelect';

// import { announcements } from "../server/models"

export default function IndexPage ({ announcements }) {

    const router = useRouter()

    const [ schoolName, setSchoolName ] = React.useState('')
    const [ manual, setManual ] = React.useState(false)
    const [ schools, setSchools ] = React.useState([])
    const [ selectedIndex, setSelectedIndex ] = React.useState('')

    const [ addressLineOne, setAddressLineOne ] = React.useState('')
    const [ addressCity, setAddressCity ] = React.useState('')
    const [ addressState, setAddressState ] = React.useState('')
    const [ addressZip, setAddressZip ] = React.useState('')

    const [ website, setWebsite ] = React.useState('')
    const [ schoolType, setSchoolType ] = React.useState('')

    const [ presidentName, setPresidentName ] = React.useState('')
    const [ presidentEmail, setPresidentEmail ] = React.useState('')
    const [ presidentDOB, setPresidentDOB ] = React.useState('')

    const [ vicePresidentName, setVicePresidentName ] = React.useState('')
    const [ vicePresidentEmail, setVicePresidentEmail ] = React.useState('')
    const [ vicePresidentDOB, setVicePresidentDOB ] = React.useState('')

    const [ treasurerName, setTreasurerName ] = React.useState('')
    const [ treasurerEmail, setTreasurerEmail ] = React.useState('')
    const [ treasurerDOB, setTreasurerDOB ] = React.useState('')

    const [ administratorName, setAdministratorName ] = React.useState('')
    const [ administratorEmail, setAdministratorEmail ] = React.useState('')
    const [ administratorPosition, setAdministratorPosition ] = React.useState('')

    async function setFullAddress(address) {

        const approxAddy = address.split(',').filter((_, i) => i < 2).join(',')

        const req = await fetch(`https://nominatim.openstreetmap.org/search.php?q=${approxAddy}&format=json&addressdetails=1`)
        const data = await req.json()

        const _address = (data[0] || {}).address || { }

        setAddressLineOne(_address.house_number + " " + _address.road)
        setAddressCity(_address.town)
        setAddressZip(_address.postcode)
        setAddressState(_address.country)

    }

    async function setWebsiteFromName(name) {

        const req = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${name}`)
        const data = await req.json()

        const unrefined = (data[0] || {}).domain || ""
        const wwwUnrefined = unrefined.startsWith('www') ? unrefined : 'www.' + unrefined
        const refined = wwwUnrefined.startsWith('http') ? wwwUnrefined : "https://" + wwwUnrefined

        setWebsite(unrefined != '' ? refined : '')

    }

    async function verifySchool() {

        const temp = schoolName;

        if (temp != schoolName) return;

        const req = await fetch(`/api/school/verify?name=${schoolName}`)
        const data = await req.json()

        setSchools([ ...data
            .filter(i => i.valid) 
        ])

    }

    async function submitForm() {

        try {

            if (presidentName.trim() == "") return

            const req = await fetch(`/api/charter/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    school_name: schoolName,
                    school_nces_id: selectedIndex,
                    address_line: addressLineOne,
                    address_town: addressCity,
                    address_area_code: addressZip,
                    address_state: addressState,
                    website: website,
                    school_type: schoolType,

                    president_name: presidentName,
                    president_email: presidentEmail,
                    president_dob: presidentDOB,

                    vice_president_name: vicePresidentName,
                    vice_president_email: vicePresidentEmail,
                    vice_president_dob: vicePresidentDOB,

                    treasurer_name: treasurerName,
                    treasurer_email: treasurerEmail,
                    treasurer_dob: treasurerDOB,

                    administrator_name: administratorName,
                    administrator_email: administratorEmail,
                    administrator_position: administratorPosition
                })
            })

            if (!req.ok) {

                console.log(await req.text())
                // console.log(await req.json())

            }

            const data = await req.json()

            router.push(data.location)
            // redirect()

        } catch (error) {

            // redirect(data.location)

            console.log(error) 

        }
        
    }

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
                { manual ? <h2 className="text-3xl font-black">School Information</h2> : <></> }
                <div className='p-2'>
                    <label htmlFor="school_name" className='text-lg font-bold'>School Name</label>
                    <div className='flex flex-row gap-2'>
                        <input name="school_name" value={schoolName} onKeyDown={(e) => { if (e.code === 13) { verifySchool(); } }} onChange={(e) => { setSchoolName(e.target.value) }} placeholder="Greens Farms Academy" className='border w-full rounded-xl p-2 text-xl' />
                        <button type="button" onClick={(e) => { e.preventDefault(); verifySchool(); return false; }} className='px-3 border block border-box rounded-xl text-xl'>🔍</button>
                    </div>
                </div>
                {
                    !manual ? <>
                    <div className='flex flex-col gap-1 mx-4 max-h-64 overflow-scroll'>
                        {
                            schools.map((i) => SchoolSelect({ data: i, selectedIndex, onClick: ({ name, id, address }) => { setSelectedIndex(id); setWebsiteFromName(name); setFullAddress(address); setSchoolName(name); setManual(true); verifySchool(); }}))
                        }
                        </div>
                        <div className='flex flex-row justify-between w-full mt-2'>
                            {/* {
                                schools.length > 6 ? <p>{schools.length - 6} more results.</p> : <></>
                            } */}
                            {
                                <p>Can't find your school? <a className='hover:underline hover:cursor-pointer' onClick={() => { setManual(true) }}>Enter its details manually</a>.</p>
                            }
                        </div>
                    </> : <></>
                }
                { manual ? <>
                    <div className='p-2 grid grid-cols-2 gap-2'>
                        <div>
                            <label htmlFor="school_website" className='text-lg font-bold'>Website</label>
                            <input value={website} onChange={(e) => { setWebsite(e.target.value) }} name="school_website" placeholder="https://gfacademy.org" className='border w-full rounded-xl p-2 text-xl' />
                        </div>
                        <div>
                            <label htmlFor="school_type" className='text-lg font-bold'>School Type</label>
                            <select value={schoolType} onChange={(e) => { setSchoolType(e.target.value) }} name="school_type" className='border w-full rounded-xl p-2 text-xl'>
                                <option value="public">Public Highschool</option>
                                <option value="charter">Charter Highschool</option>
                                <option value="magnet">Magnet Highschool</option>
                                <option value="private">Private Highschool</option>
                                <option value="college">4-Year College</option>
                            </select>
                        </div>
                    </div>
                    <p className='mb-8 text-md mx-auto max-w-xl'>
                        For the information above, please find the schools official name, school type, and website. This information should be obtained and verified from the administrator that signs the document.
                    </p>
                    <div className='p-2'>
                        <label htmlFor="address_line" className='text-lg font-bold'>Address Line</label>
                        <input name="address_line" value={addressLineOne} onChange={(e) => { setAddressLineOne(e.target.value) }} placeholder="35 Beachside Ave" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div className='p-2 grid grid-cols-3 gap-2'>
                        <div>
                            <label htmlFor="address_town" className='text-lg font-bold'>Town</label>
                            <input name="address_town" value={addressCity} onChange={(e) => { setAddressCity(e.target.value) }} placeholder="Westport" className='border w-full rounded-xl p-2 text-xl' />
                        </div>
                        <div>
                            <label htmlFor="address_state" className='text-lg font-bold'>State</label>
                            <input name="address_state" value={addressState} onChange={(e) => { setAddressState(e.target.value) }} placeholder="Connecticut" className='border w-full rounded-xl p-2 text-xl' />
                        </div>
                        <div>
                            <label htmlFor="address_area_code" className='text-lg font-bold'>Area Code</label>
                            <input name="address_area_code" value={addressZip} onChange={(e) => { setAddressZip(e.target.value) }} placeholder="06880" className='border w-full rounded-xl p-2 text-xl' />
                        </div>
                    </div>
                    <p className='mb-8 text-md mx-auto max-w-xl'>
                        Above is the area for the official address of the school. This is the address listed on websites, communications, and official documents. This will also be where the care-package is shipped to.
                    </p>
                </> : <></>
                }
            </section>
            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <h2 className="text-3xl font-black">Administration Information</h2>
                <div className='p-2'>
                    <label htmlFor="administrator_name" className='text-lg font-bold'>Administrator Name</label>
                    <input name="administrator_name" value={administratorName} onChange={(e) => { setAdministratorName(e.target.value) }} placeholder="Michael Thompson" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='p-2 grid grid-cols-2 gap-2'>
                    <div>
                        <label htmlFor="administrator_email" className='text-lg font-bold'>Administrator Email</label>
                        <input name="administrator_email" value={administratorEmail} onChange={(e) => { setAdministratorEmail(e.target.value) }} type="email" placeholder="thompsonm@gfacademy.org" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div>
                        <label htmlFor="administrator_position" className='text-lg font-bold'>Administrator Position</label>
                        <input name="administrator_position" value={administratorPosition} onChange={(e) => { setAdministratorPosition(e.target.value) }} placeholder="Head of Upper School" className='border w-full rounded-xl p-2 text-xl' />
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
                    <input name="president_name" value={presidentName} onChange={(e) => { setPresidentName(e.target.value) }} placeholder="William McGonagle" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='p-2 grid grid-cols-2 gap-2'>
                    <div>
                        <label htmlFor="president_email" className='text-lg font-bold'>Email</label>
                        <input name="president_email" value={presidentEmail} onChange={(e) => { setPresidentEmail(e.target.value) }} type="email" placeholder="william@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div>
                        <label htmlFor="president_birth_date" className='text-lg font-bold'>Birth Date</label>
                        <input name="president_birth_date" value={presidentDOB} onChange={(e) => { setPresidentDOB(e.target.value) }} type="date" className='border w-full rounded-xl p-2 text-xl' />
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
                    <input name="vice_president_name" value={vicePresidentName} onChange={(e) => { setVicePresidentName(e.target.value) }} placeholder="Neil Chaudhari" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='p-2 grid grid-cols-2 gap-2'>
                    <div>
                        <label htmlFor="vice_president_email" className='text-lg font-bold'>Email</label>
                        <input name="vice_president_email" value={vicePresidentEmail} onChange={(e) => { setVicePresidentEmail(e.target.value) }} type="email" placeholder="neil@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div>
                        <label htmlFor="vice_president_birth_date" className='text-lg font-bold'>Birth Date</label>
                        <input name="vice_president_birth_date" value={vicePresidentDOB} onChange={(e) => { setVicePresidentDOB(e.target.value) }} type="date" className='border w-full rounded-xl p-2 text-xl' />
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
                    <input name="treasurer_name" value={treasurerName} onChange={(e) => { setTreasurerName(e.target.value) }} placeholder="Zoma Tessema" className='border w-full rounded-xl p-2 text-xl' />
                </div>
                <div className='p-2 grid grid-cols-2 gap-2'>
                    <div>
                        <label htmlFor="treasurer_email" className='text-lg font-bold'>Email</label>
                        <input name="treasurer_email" value={treasurerEmail} onChange={(e) => { setTreasurerEmail(e.target.value) }} type="email" placeholder="zoma@placeholder.com" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                    <div>
                        <label htmlFor="treasurer_birth_date" className='text-lg font-bold'>Birth Date</label>
                        <input name="treasurer_birth_date" value={treasurerDOB} onChange={(e) => { setTreasurerDOB(e.target.value) }} type="date" className='border w-full rounded-xl p-2 text-xl' />
                    </div>
                </div>
                <p className='mb-8 text-md mx-auto max-w-xl'>
                    The Charter Treasurer is the third-in-command of the charter. They manage the finances, take notes during charter meetings, and organize the charter&apos;s online presence and marketing.
                </p>
            </div>
            </section>
            <section className="max-w-4xl mt-16 p-4 mx-auto">
                <input onClick={() => { submitForm() }} className="w-full rounded-lg p-4 font-black text-lg bg-green-300 hover:bg-green-400 hover:cursor-pointer" type="submit" value="Continue to Payment & Final Steps" />
                
                <p className='mt-4 mb-4 text-md mx-auto max-w-xl'>
                    To start a charter, there is a one time payment of at least $50.00 USD. This charge is to cover the cost of the care package that we ship to your charter once we approve your application. If your application doesn&apos;t get approved, you will be given a full refund.
                </p>
                <p className='mb-8 text-md mx-auto max-w-xl'>
                    By clicking submit, you agree to the <Link className='underline' href="/terms">Terms and Conditions</Link> of the FPA Charter System.
                </p>
            </section>
        </form>
    </Layout>
}
