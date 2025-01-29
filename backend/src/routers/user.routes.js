import {Router} from "express"

import { loginUser,registerUser } from "../controller/user.controller.js"



const router = Router()

router.route("/login").post(loginUser)

router.route("/register").post(registerUser)

export default router