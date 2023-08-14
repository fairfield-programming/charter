import { Charter } from "../../../server/models"

import stripeInit from 'stripe';
const stripe = stripeInit('sk_test_51LKrcgHSFWYfEtuC3Fgqrzo1zUv5moMTBO4gDZClo2mrRoAuBpEqHyVsWRri3BDGJ72DCQKrStvNePhZXCt2x37P005rif6shg');

export default async function handler(req, res) {
  
    // const charter = await Charter.create({
    //     name: req.query.name,
    //     description: req.query.description,
    //     long: req.query.long,
    //     lat: req.query.lat
    // });

    // const { long: longitude, lat: latitude } = req.body;

    // [x] Add Charter to Database
    // [x] Add Accounts for the President, Vice-President, and Treasurer
    // [ ] Charge the Payment on their Credit Card
    // [ ] Send Emails to them that they are pending verification

    // Create the first announcement of the charter
    const announcement = await Announcement.create({
        title: `${req.body.school_name} officially launches an FPA Charter.`,
        short: `Today, ${req.body.president_name} launched ${req.body.school_name}'s FPA Charter.`,
        content: `Today, ${req.body.president_name} launched ${req.body.school_name}'s FPA Charter. ${req.body.president_name} worked with ${req.body.vice_president_name}, charter vice-president, and ${req.body.treasurer_name}, charter treasurer, to make it happen. To learn more, please contact ${req.body.president_name} or check out the charter's page.`,
        userId: president.id,
        charterId: _charter.id
    })
    
    res.status(200).json(req);

}
