import * as React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

const TabbarItem = ({ url, text, icon }) => {

    let active = false;
    if (typeof window != 'undefined')  
        active = url == window.location.pathname.split('#')[0].trim('/');

    return <li class={`flex-1 ${active ? "bg-gray-100" : ""}`}>
            <Link class="relative block p-4" href={url}>
                <div class={`flex items-center justify-center`}>
                    { icon }
                    <span class={`ml-3 text-sm font-medium text-gray-900`}> { text } </span>
                </div>
            </Link>
        </li>;

}

const Tabbar = ({ pages }) => {

    return <section class="w-full bg-gray-50">
        <ul class="w-full flex border-b border-gray-100">
            {
                (pages || []).map(i => 
                    <TabbarItem key={i.url} url={i.url} text={i.text} icon={i.icon} />)
            }
        </ul>
    </section>


}

export default Tabbar
