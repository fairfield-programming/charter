import { Announcement, Charter, User } from "../../../server/models"

import bcrypt from 'bcrypt';

import stripeInit from 'stripe';
const stripe = stripeInit('sk_test_51LKrcgHSFWYfEtuC3Fgqrzo1zUv5moMTBO4gDZClo2mrRoAuBpEqHyVsWRri3BDGJ72DCQKrStvNePhZXCt2x37P005rif6shg');

function serialize(obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default async function handler(req, res) {
  
    const geocodeDataRaw = await fetch(`https://nominatim.openstreetmap.org/search.php?${serialize({
        street: req.body.address_line,
        city: req.body.address_town,
        state: req.body.address_state,
        postalcode: req.body.address_area_code,
        format: 'jsonv2'
      })}`);
    const geocodeDataJson = await geocodeDataRaw.json();
    const geocodeDataJsonSorted = geocodeDataJson.sort((a, b) => {
        const isGoodMatchA = a.type.toLowerCase().startsWith('school');
        const isGoodMatchB = b.type.toLowerCase().startsWith('school');
    
        if (isGoodMatchA ^ isGoodMatchB) { // XOR
            return isGoodMatchA ? -1 : 1;
        }
    
        return a.type.localeCompare(b.type);
    });

    if (geocodeDataJsonSorted.length == 0) return res.status(400).json({ error: "Invalid Address" });
    const { lon: long, lat, display_name } = geocodeDataJsonSorted[0];

    const displayNameSections = display_name.split(', ')
    const state = displayNameSections[displayNameSections.length - 3]
    const city = displayNameSections[displayNameSections.length - 5]

    const _charter = await Charter.create({
        name: req.body.school_name,
        description: `${req.body.school_name} is a highschool located in ${city}, ${state}.`,
        long, 
        lat,
        icon: "",
        data: JSON.stringify({
            nces_id: req.body.school_nces_id,
            type: req.body.school_type,
            administrator: {
                name: req.body.administrator_name,
                email: req.body.administrator_email,
                position: req.body.administrator_position
            }
        }),
        public: false
    });

    const presidentHashed = await bcrypt.hash(req.body.president_name, 10);
    const vicePresidentHashed = await bcrypt.hash(req.body.vice_president_name, 10);
    const treasurerHashed = await bcrypt.hash(req.body.treasurer_name, 10);

    const president = await User.create({
        full_name: req.body.president_name,
        username: req.body.president_name.toLowerCase().replace(/ /g, '-'),
        password: presidentHashed,
        email: req.body.president_email,
        charterId: _charter.id
    })

    const vicePresident = await User.create({
        full_name: req.body.vice_president_name,
        username: req.body.vice_president_name.toLowerCase().replace(/ /g, '-'),
        password: vicePresidentHashed,
        email: req.body.vice_president_email,
        charterId: _charter.id
    })

    const treasurer = await User.create({
        full_name: req.body.treasurer_name,
        username: req.body.treasurer_name.toLowerCase().replace(/ /g, '-'),
        password: treasurerHashed,
        email: req.body.treasurer_email,
        charterId: _charter.id
    })

    const announcement = await Announcement.create({
        title: `${req.body.school_name} officially launches an FPA Charter.`,
        short: `Today, ${req.body.president_name} launched ${req.body.school_name}'s FPA Charter.`,
        content: `Today, ${req.body.president_name} launched ${req.body.school_name}'s FPA Charter. ${req.body.president_name} worked with ${req.body.vice_president_name}, charter vice-president, and ${req.body.treasurer_name}, charter treasurer, to make it happen. To learn more, please contact ${req.body.president_name} or check out the charter's page.`,
        userId: president.id,
        charterId: _charter.id
    })

    // TODO: Charge their credit cards
    // TODO: Send out emails that tell them to reset their passwords

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: 'price_1MmMs1HSFWYfEtuCacuyxVzJ',
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000/join`,
        automatic_tax: {
            enabled: true
        },
    });

    res.redirect(303, session.url);

}
