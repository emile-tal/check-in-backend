import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10

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

export async function hashPass(password) {
    try {
        const hashedPass = await bcrypt.hash(password, saltRounds)
        return hashedPass
    } catch (error) {
        console.error(error)
    }
}

export async function checkPass(password, dbPass) {
    try {
        const match = await bcrypt.compare(password, dbPass)
        return match
    } catch (error) {
        console.error(error)
    }
}