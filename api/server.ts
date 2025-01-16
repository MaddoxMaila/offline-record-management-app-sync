import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieparser from 'cookie-parser'
import helmet from 'helmet'

//import routes
import Routers from './routers/index';

import ErrorMid from './routers/middleware/ErrorMid';
import ApiKeyMiddleware from './routers/middleware/ApiKeyMiddleware';
import AddUserMiddleware from './routers/middleware/AddUserMiddleware';
import createUser from './createDummyUser';

//init
dotenv.config()

const app = express()

// configurations
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());
app.use(helmet());
//enable cros 
app.use(cors({ origin: true, credentials: true }))

const BASE_URL: string = process.env.BASE_URL || "/api/v1"
const MIDDLWARES = [ApiKeyMiddleware, AddUserMiddleware]

//routers
app.get(`${BASE_URL}`, (_, res) => res.send("Running... 🚀"))

/**
 * Define routes to express so that they can accessible
 * Also added API key middleware here in the top level of which the inclusion will trickle down to each sub-route
 */
app.use(`${BASE_URL}/auth`, Routers.authRouter)
app.use(`${BASE_URL}/record`, MIDDLWARES, Routers.recordRouter)

//catch all error
app.use(ErrorMid);

/**
 * Some of the functionalities I created needs a user,
 * This would just create a user one time on a first server up, and avoids creating the user again after subsequent application starts
 */
createUser({
    username: "maddox",
    email: "maddox@gmail.com",
    password: "maddox"
})


const port = process.env.PORT || 2828;
app.listen(port, () => console.log(`Server Running on PORT ${port}`))