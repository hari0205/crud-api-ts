
import { RequestHandler } from 'express'
import * as jwt from "jsonwebtoken"
import 'express-async-errors'
import prisma from '../connections/connection'




// Middleware to check authentication
export const isAuthenticated: RequestHandler = async (req, res, next) => {
    const token = req.cookies['x-auth-token']
    if (!token) {
        return res.status(403).json({ status: 403, message: "Token missing" })
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY!, { algorithms: ["HS256"] }) as jwt.JwtPayload

    const currentUser = await prisma.user.findFirst({
        where: { id: decoded.id, email: decoded.email }, select: { id: true, email: true }
    })
    if (currentUser == null) {
        return next(res.status(401).json({ status: 401, message: "User belonging to token does not exist" }))
    }
    (req as any | null).user = currentUser
    next()

}