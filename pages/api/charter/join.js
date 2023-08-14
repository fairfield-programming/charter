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
  
    // Verify School Information
    if (req.body.school_name == undefined) return res.status(400).json({ error: "School Name is not defined." });
    if (req.body.school_nces_id == undefined) return res.status(400).json({ error: "NCES ID is not defined." });
    if (req.body.address_line == undefined) return res.status(400).json({ error: "Address Line is not defined." });
    if (req.body.address_town == undefined) return res.status(400).json({ error: "Address Town is not defined." });
    if (req.body.address_area_code == undefined) return res.status(400).json({ error: "Address Area Code is not defined." });
    if (req.body.website == undefined) return res.status(400).json({ error: "Website is not defined." });
    if (req.body.school_type == undefined) return res.status(400).json({ error: "School Type is not defined." });
    
    // Verify President Information
    if (req.body.president_name == undefined) return res.status(400).json({ error: "President Name is not defined." });
    if (req.body.president_email == undefined) return res.status(400).json({ error: "President Email is not defined." });
    if (req.body.president_dob == undefined) return res.status(400).json({ error: "President Date of Birth is not defined." });

    // Verify Vice-President Information
    if (req.body.vice_president_name == undefined) return res.status(400).json({ error: "Vice President Name is not defined." });
    if (req.body.vice_president_email == undefined) return res.status(400).json({ error: "Vice President Email is not defined." });
    if (req.body.vice_president_dob == undefined) return res.status(400).json({ error: "Vice President Date of Birth is not defined." });

    // Verify Treasurer Information
    if (req.body.treasurer_name == undefined) return res.status(400).json({ error: "Treasurer Name is not defined." });
    if (req.body.treasurer_email == undefined) return res.status(400).json({ error: "Treasurer Email is not defined." });
    if (req.body.treasurer_dob == undefined) return res.status(400).json({ error: "Treasurer Date of Birth is not defined." });

    // Verify Administrator Information
    if (req.body.administrator_name == undefined) return res.status(400).json({ error: "Administrator Name is not defined." });
    if (req.body.administrator_email == undefined) return res.status(400).json({ error: "Administrator Email is not defined." });
    if (req.body.administrator_position == undefined) return res.status(400).json({ error: "Administrator Position is not defined." });

    // Check the Location
    const geocodeDataRaw = await fetch(`https://nominatim.openstreetmap.org/search.php?${serialize({
        street: req.body.address_line,
        city: req.body.address_town,
        postalcode: req.body.address_area_code,
        format: 'jsonv2'
    })}`);
    const geocodeDataJson = await geocodeDataRaw.json();

    // Sort the possible locations (make sure the school is in front)
    const geocodeDataJsonSorted = geocodeDataJson.sort((a, b) => {
        const isGoodMatchA = a.type.toLowerCase().startsWith('school');
        const isGoodMatchB = b.type.toLowerCase().startsWith('school');
    
        if (isGoodMatchA ^ isGoodMatchB) { // XOR
            return isGoodMatchA ? -1 : 1;
        }
    
        return a.type.localeCompare(b.type);
    });

    // If the Address Cant be Found, It is Invalid
    if (geocodeDataJsonSorted.length == 0) return res.status(400).json({ error: "Invalid Address" });
    const { lon: long, lat, display_name } = geocodeDataJsonSorted[0];

    // Grab the State and City
    const state = req.body.state
    const city = req.body.address_town

    // Create a Charter
    const _charter = await Charter.create({
        name: req.body.school_name,
        description: `${req.body.school_name} is a highschool located in ${city}, ${state}.`,
        long, 
        lat,
        // icon: "",
        data: JSON.stringify({
            nces_id: req.body.school_nces_id,
            type: req.body.school_type,
            administrator: {
                name: req.body.administrator_name,
                email: req.body.administrator_email,
                position: req.body.administrator_position
            },
            website: req.body.website
        }),
        verified: false
    });

    // Create Passwords for the President, Vice-President, and Treasurer
    const presidentHashed = await bcrypt.hash(req.body.president_dob, 10);
    const vicePresidentHashed = await bcrypt.hash(req.body.vice_president_dob, 10);
    const treasurerHashed = await bcrypt.hash(req.body.treasurer_dob, 10);

    // Create an Account for the President
    const president = await User.create({
        full_name: req.body.president_name,
        username: req.body.president_name.toLowerCase().replace(/ /g, '-'),
        password: presidentHashed,
        email: req.body.president_email
    })

    // Create an Account for the Vice-president
    const vicePresident = await User.create({
        full_name: req.body.vice_president_name,
        username: req.body.vice_president_name.toLowerCase().replace(/ /g, '-'),
        password: vicePresidentHashed,
        email: req.body.vice_president_email
    })

    // Create an Account for the Treasurer
    const treasurer = await User.create({
        full_name: req.body.treasurer_name,
        username: req.body.treasurer_name.toLowerCase().replace(/ /g, '-'),
        password: treasurerHashed,
        email: req.body.treasurer_email
    })

    // Add the users to the charter
    _charter.addUser(president);
    _charter.addUser(vicePresident);
    _charter.addUser(treasurer);

    // TODO: Charge their credit cards
    // TODO: Send out emails that tell them to reset their passwords

    const pricePerShirt = 500;
    const pricePerSticker = 7860 / 1000;
    const shippingCost = 300;
    const percentGain = 0.15;

    const stickerCount = 20;
    const shirtCount = 8;

    const amount = Math.floor((shippingCost + pricePerShirt * shirtCount + pricePerSticker * stickerCount) * (1 + percentGain))

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card'],
    });

    res.json({
        pathname: `/join/payment`,
        query: {
            id: _charter.id,
            secret: paymentIntent.client_secret,
            website: req.body.website,
            amount: amount
        }
    });

}
