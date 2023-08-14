// https://nces.ed.gov/surveys/pss/privateschoolsearch/school_list.asp?SchoolID=A0500866

import * as util from 'util'
import * as cheerio from 'cheerio';
import { Charter } from "../../../server/models"

function checkIfGradesValid(input) {

    const parts = input.split('-')

    const grades = {
        "PK": 4,
        "KG": 5,
        "1": 6,
        "2": 7,
        "3": 8,
        "4": 9,
        "5": 10,
        "6": 11,
        "7": 12,
        "8": 13,
        "9": 14,
        "10": 15,
        "11": 16,
        "12": 17,
    }

    // Figure out lowest and highest grade
    const min = grades[(parts[0] || "").trim()] || 0
    const max = grades[(parts[1] || "").trim()] || 0

    // Check if grades are in highschool/ 8th grade
    // if (min > 13) return false
    if (max < 13) return false
    return true

}

function beautifyName(name) {

    return name.split(' ').map(i => {

        if (i.length == 0) return ''
        if (!i.includes('-')) return i[0].toUpperCase() + i.slice(1).toLowerCase()

        return i.split('-').map(j => {

            if (j.length == 0) return ''
            return j[0].toUpperCase() + j.slice(1).toLowerCase()

        }).join('-')

    }).join(' ')

}

function calculateSchoolType(isPublic, name) {

    if (!isPublic) return 'private'
    if (name.toUpperCase().includes('MAGNET')) return 'magnet'
    if (name.toUpperCase().includes('CHARTER')) return 'charter'
    return 'public'

}

export default async function handler(req, res) {
  
    if (req.query.name == undefined) {

        return res.status(500).json({ error: "No School Name Provided." });

    }

    const request = await fetch(`https://nces.ed.gov/globallocator/index.asp?itemname=${req.query.name.replace(/\s/g, '+')}&School=1&PrivSchool=1&College=1`)
    const html = await request.text()
    const $ = cheerio.load(html);
    const schools = $(".Institution > table[border!=0] > tbody > tr")

    const output = []
    schools.map(function(i, v){
        
        const root = $(v).find('td:nth-child(2)').first()
        const instData = $(v).find('td:nth-child(3)').first()

        const name = root.find('a').first()
        const contents = root.contents()
        const address = $(contents[2])
        const phone = $(contents[4]).text()

        const ncesAttr = name.attr('href')
        const regex = /ID=[a-zA-Z0-9]+'\);/g
        const match = ncesAttr.match(regex)[0]
        const nces = match.slice(3, match.length - 3)

        const instGrades = instData.find('p').first().text() || instData.text()
        const grades = instGrades.slice(8) // remove 'grades: '

        const isPublic = instData.find('p').length == 0

        output.push({ 
            id: nces,
            name: beautifyName(name.text()), 
            address: beautifyName(address.text()), 
            phone: phone.slice(0, phone.length - 3).trim(), 
            grades: grades,
            valid: checkIfGradesValid(grades),
            type: calculateSchoolType(isPublic, name.text())
        });

    });

    res.send(output)

}
