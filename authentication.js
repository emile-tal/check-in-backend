import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

export function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        if (token && jwt.verify(token, process.env.JWT_SECRET)) {
            req.id = jwt.decode(token)
            next()
        } else {
            return res.sendStatus(403)
        }
    } catch (error) {
        return res.sendStatus(403)
    }
}