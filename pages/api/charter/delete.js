import { Charter } from "../../../server/models"

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
  
    await Charter.destroy({
        where: {
            id: req.query.id
        }
    });

    res.status(200).json({ });

}
