import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from "../../../server/models"

export default async function handler(req, res) {
  
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (user == null) return res.status(403).json({ error: "Incorrect Email/Password Combo" });

    const passwordsMatch = await bcrypt.compare(req.body.password, user.password)

    if (!passwordsMatch) return res.status(403).json({ error: "Incorrect Email/Password Combo" });

    const token = jwt.sign({ 
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        charterId: user.charterId
    }, process.env.JWT_TOKEN || "BLAH BLAH BLAH");

    res.status(200).json({ token: token, id: user.id });

}
