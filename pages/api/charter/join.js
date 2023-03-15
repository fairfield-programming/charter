import { Charter } from "../../../server/models"

export default async function handler(req, res) {
  

    const charter = await Charter.create({
        name: req.query.name,
        description: req.query.description,
        long: req.query.long,
        lat: req.query.lat
    });
    res.status(200).json(charter);

}
