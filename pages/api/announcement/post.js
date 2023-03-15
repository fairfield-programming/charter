import { Announcement } from "../../../server/models"

export default async function handler(req, res) {
  
    const announcement = await Announcement.create({
        title: req.query.title,
        content: req.query.content,
        userId: req.query.userId,
        charterId: req.query.charterId
    });
    res.status(200).json(announcement);

}
