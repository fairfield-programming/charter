import Head from 'next/head'
import Link from 'next/link'

import { useCookies } from "react-cookie"

import {useRef, useState} from 'react'
import { Editor } from '@tinymce/tinymce-react';

import Layout from "../../components/layout"
import Seo from "../../components/seo"

import Announcement from "../../components/announcement"
import Tabbar from '../../components/tabbar'

async function PostAnnouncement(title, short, content, token) {

    const responseRaw = await fetch('/api/announcement/post', {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ 
            title,
            short,
            content
        })
    });

    const responseJson = await responseRaw.json();

    if (responseJson.error) return alert(responseJson.error);

    window.location.href = `/announcement/${responseJson.id}`;

}

export default function IndexPage ({ mainAnnouncement, localAnnouncement, globalAnnouncement }) {

    const titleRef = useRef(null);
    const shortRef = useRef(null);
    const editorRef = useRef(null);
    
    const [ cookie, setCookie ] = useCookies(["token"]);
    
    const [ title, setTitle ] = useState("New Announcement");
    const [ short, setShort ] = useState("This is some subtext here.");
    const [ body, setBody ] = useState("This is a placeholder announcement.");

   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
     }
   };

  return <Layout auth>
    <Head>
      <title>New Announcement • FPA Charter Program</title>
    </Head>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
        <h1 className="text-5xl font-black flex flex-row items-center gap-4" >
            <span className='outline-none' ref={titleRef} onInput={(e) => { setTitle(e.target.innerText) }} contentEditable>New Announcement</span>
            <svg onClick={() => { window.getSelection().selectAllChildren(titleRef.current) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="hover:cursor-pointer w-8 h-8 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </h1>
        <p className="text-4xl font-light flex flex-row items-center gap-4" >
            <span className='outline-none' ref={shortRef} onInput={(e) => { setShort(e.target.innerText) }} contentEditable>Short description of announcement.</span>
            <svg onClick={() => { window.getSelection().selectAllChildren(shortRef.current) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="hover:cursor-pointer w-8 h-8 text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </p>
    </section>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
        <Editor
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue="<p>This is the initial content of the editor.</p>"
         tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.4.0/tinymce.min.js" 
         value={body}
         onEditorChange={(newValue) => { setBody(newValue) }}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist', 
             'autolink', 
             'lists',
            'link', 'image', 'anchor',
             'visualblocks',
             'media', 'table', 'wordcount',
             'codesample'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic underline | h2 h3 | codesample blockquote image media link table | bullist numlist |',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />
    </section>
    <section className="max-w-5xl mt-16 p-4 mx-auto">
        <button className='rounded-xl w-full p-4 bg-green-600 hover:bg-green-500 font-medium text-xl text-white' onClick={() => { PostAnnouncement(title, short, body, cookie.token); }}>Post Announcement</button>
    </section>
</Layout>
}
