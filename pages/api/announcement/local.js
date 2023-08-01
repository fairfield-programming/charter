import { cookies } from 'next/headers';
import { Announcement } from "../../../server/models"
import jwt from 'jsonwebtoken';
import requestIp from 'request-ip'

export default async function handler(req, res) {
  
    const fetchResult = await fetch(`http://ip-api.com/json/${requestIp.getClientIp(req)}`);

    const announcements = await Announcement.findAll({
        limit: 6
    });
    res.status(200).json(announcements);

}
