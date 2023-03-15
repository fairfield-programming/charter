import * as React from "react"
import Link from 'next/link'

const Announcement = ({ title, short, type, small, id }) => {
  
  let textLarge = 'text-3xl'
  let textSmall = 'text-xl'

  if (small) {

    textLarge = 'text-md'
    textSmall = 'text-xs'

  }

  return <Link href={`/announcement/${id}`}>
      <div className="relative overflow-hidden bg-red-500 aspect-video rounded border-2">
        <img className="absolute left-0 top-0 bottom-0 right-0 z-0" alt={`"${title}" Announcement Cover`} src="https://images.unsplash.com/photo-1603282575426-baffe83b6a15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" />
        <div className={`absolute left-0 bottom-0 right-0 z-10 bg-white ${ small ? 'p-2' : 'p-4'} flex flex-col items-start justify-end`}>
          <h1 className={`font-bold ${textLarge} z-20 whitespace-nowrap`}>{ title }</h1>
          <p className={`font-medium ${textSmall} z-20 whitespace-nowrap`}>{ short }</p>
        </div>
      </div>
  </Link>

}

export default Announcement
