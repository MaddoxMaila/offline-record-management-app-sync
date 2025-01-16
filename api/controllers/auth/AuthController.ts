import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcryptjs from 'bcryptjs'
import ApiResponse from '../../libs/ApiResponse';
import Helper from "../../utils/Helper";
import DatabaseSingleton from "../../prisma/DatabaseSingleton";

const db: PrismaClient = DatabaseSingleton.getDb()

const AuthController = {
    /**
     * @description
     * get email, name, password from req.body
     * do validation
     * check already have an account or not(mySql Optional,Mongo required)
     * create password hash,save into database
     * generate a jwt access token,set into http cookie
     * return new user object as response
     * @param { email, name, password, type } = req.body
     * @response {error(boolean), message(String), response(object:USER)}
     */
    signUp: async (req: Request, res: Response) => {
        try {
            const { email, username, password } = req.body
            //validatioin handle by sequlize
            if (password.length < 6) {
                throw new Error("Password Length Should be More than 5 character.")
            }
            //get hash pass & save new user into db
            const hashpass: string = await bcryptjs.hash(password, await bcryptjs.genSalt(10))

            //save on database
            const u = await db.user.findUnique({
                where: {
                    email: email
                }
            })
            if (u) {
                throw new Error("Already Registered with this email.")
            }
            //create the new user.
            const user = await db.user.create({
                data: {
                    username,
                    email,
                    password: hashpass
                }
            })

            //get token and set into cookie
            const token = Helper.getJWTtoken(user.id + "")

            //, token-if you want you can pass the token
            res.status(200).json(ApiResponse(false, "user created successfully", {user, token}))

        } catch (e: any) {
            console.log("auth sign up: ", e);
            let response = ApiResponse(true, e.message, e);
            res.json(response);
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            console.log(req.body)
            const { email, password } = req.body
            // //validatioin
            if (!email || !password) {
                throw new Error("Enter email or password")
            }
            // //check user is available or not in db
            const u = await db.user.findUnique({
                where: {
                    email: email
                }
            })
            if (!u) {
                throw new Error("No User Found with this email!")
            }
            const user = u!

            // //console.log(user);
            // //validate password
            const ckPass = await bcryptjs.compare(password, user.password)
            if (!ckPass) {
                throw new Error("Wrong email or password")
            }

            // //get token and set into cookie
            const token = Helper.getJWTtoken(user.id + "")

            //, token-if you want you can pass the token
            res.status(200).json(ApiResponse(false, "user logged in successfully", {token, user}))

        } catch (e: any) {
            console.log("auth login: ", e);
            res.json(ApiResponse(true, e.message, e));
        }
    }
}

export default AuthController