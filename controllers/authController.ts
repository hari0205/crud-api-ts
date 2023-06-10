import { RequestHandler } from "express";
import * as bcrypt from "bcrypt";
import "express-async-errors"
import * as jwt from "jsonwebtoken"
import prisma from "../connections/connection";




export const registerHandler: RequestHandler = async (req, res) => {

    const { name, email, password } = req.body;
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user == null) {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password, // Password hashing handled by prisma middleware --" Models heavy controllers light" approach
            }
        });
        if (newUser != null) {
            res.status(201).json({
                message: "User created successfully",
            })
        } else {
            res.status(500).json({ message: "Error creating user" })
        }
    } else {
        res.status(400).json({ message: "User already exists" })
    }

}



export const loginHandler: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please provide email and password." })
    }
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })
    if (user == null) {
        res.status(404).json({ message: "User unavailable." })
    } else {
        const ok = await bcrypt.compare(password, user.password)
        if (ok) {
            const token = jwt.sign({
                email: user.email,
                id: user.id
            }, process.env.SECRET_KEY!, {
                expiresIn: "1h",
                algorithm: "HS256",
            })
            res.cookie("x-auth-token", token).status(200).json({ message: "Login successful.", token })
        } else {
            res.status(400).json({ message: "Invalid credentials." })
        }


    }


}