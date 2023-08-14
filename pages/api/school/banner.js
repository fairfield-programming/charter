// https://nces.ed.gov/surveys/pss/privateschoolsearch/school_list.asp?SchoolID=A0500866

import * as util from 'util'
import * as cheerio from 'cheerio';
import { Charter } from "../../../server/models"

import probe from 'probe-image-size';

export default async function handler(req, res) {
  
    if (req.query.website == undefined) {

        return res.status(500).json({ error: "No Website Provided." });

    }

    const request = await fetch(req.query.website)
    const html = await request.text()
    const $ = cheerio.load(html);
    const images = $("img")

    const output = []

    for (let el of images) {

        console.log(el)

        if (el.attribs.src != undefined) {

            try {

                const url = new URL(el.attribs.src, req.query.website).toString()
                let result = await probe(url);
                console.log(result);

                output.push({
                    url: url,
                    width: result.width
                })

            } catch (e) {



            }

        }

        if (el.attribs['data-image-sizes'] != undefined) {

            const json = JSON.parse(decodeURI(el.attribs['data-image-sizes']))

            output.push(...json)

        }

    }

    res.send(output.sort(function(a, b){ return b.width - a.width }))

}
