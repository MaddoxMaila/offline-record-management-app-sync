import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs'

import DatabaseSingleton from './prisma/DatabaseSingleton';

const createUser = async (user: {username: string, email: string, password: string}) => {
    
    try{

        const db: PrismaClient = DatabaseSingleton.getDb()
        //get hash pass & save new user into db
        user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt(10))

        // Find duplicate
        if (await db.user.findUnique({
            where: {
                email: user.email
            }
        })) {
            throw new Error("Already Registered with this email.")
        }
        //create the new user.
        const u = await db.user.create({
            data: user
        })

        console.log("Dummy user created...")

    }catch(e: any){

        console.log({error: e.message, created: "dummy user creation failed"})

    }

}

export default createUser