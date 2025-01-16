import {Router} from "express"
import create from "../../controllers/record-item/create"


const recordRouter = Router()


recordRouter.post('/create', create.new)

recordRouter.post('sync', create.sync)

export default recordRouter