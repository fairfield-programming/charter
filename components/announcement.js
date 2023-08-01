import * as React from "react"
import Link from 'next/link'

const Announcement = ({ title, short, schoolIcon, small, id }) => {
  
  let textLarge = 'text-3xl'
  let textSmall = 'text-xl'

  if (small) {

    textLarge = 'text-lg'
    textSmall = 'text-sm'

  }

  return <Link href={`/announcement/${id}`}>
      <div className="relative rounded-xl border-2 h-full flex flex-row overflow-hidden">
        {/* <img className="h-full aspect-square" src={schoolIcon} /> */}
        <div className="p-2">
          <h1 className={`font-bold ${textLarge} z-20`}>{ title }</h1>
          <p className={`font-normal ${textSmall} z-20`}>{ short }</p>
        </div>
      </div>
  </Link>

}

export default Announcement
