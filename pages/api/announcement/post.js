import { cookies } from 'next/headers';
import { Announcement } from "../../../server/models"
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  
    const title = req.body.title || "";
    const short = req.body.short || ""; 
    const content = req.body.content || ""; 

    const tokenParts = (req.headers.authorization || " ").split(' ')
    if (tokenParts.length != 2) return res.status(400).json({ error: "Hackers, please stop." });
    const token = tokenParts[1]

    try {

        if (title.length < 4) return res.status(400).json({ error: "Title must be four characters or longer. " });
        if (short.length < 4) return res.status(400).json({ error: "Short must be four characters or longer. " });
        if (content.length < 4) return res.status(400).json({ error: "Announcement content must be four characters or longer. " });

        if (token == undefined) return res.status(403).json({ error: "No Authorization." });
        
        const decoded = jwt.verify(token, process.env.JWT_TOKEN || "BLAH BLAH BLAH");

        const announcement = await Announcement.create({
            title,
            content,
            short,
            userId: decoded.id,
            charterId: decoded.charterId
        });
        res.status(200).json(announcement);

    } catch (e) {

        console.error(e)
        res.status(403).json({ error: JSON.stringify(token) });

    }

}
