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

    res.status(200).json(req);

}
