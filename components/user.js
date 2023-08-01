import * as React from "react"
import Link from 'next/link'

const UserIcon = ({ name, description, profilePhoto, id }) => {

  return <Link className="w-full min-w-[150px] max-w-[300px]" href={`/user/${id}`}>
    <img className="aspect-square rounded-3xl border-2 border-white shadow" src={profilePhoto} alt={`${name}'s FPA User Icon`} />
    <p className="w-full text-center font-bold">{ name }</p>
  </Link>

}

export default UserIcon
