import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"


const prisma = new PrismaClient({ log: ["info", "warn", "error"] });
prisma.$use(async (params, next) => {
    if (params.model == "User" && params.action == "create") {
        const hashedpass = await bcrypt.hash(params.args.data.password, 10)
        params.args.data.password = hashedpass
    }

    return next(params);
})

export default prisma