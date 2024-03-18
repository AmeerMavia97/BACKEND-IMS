import express from 'express'
import users from './users.mjs'
import courses from './courses.mjs'
const router = express.Router()


router.use("/users" , users)
router.use("/courses" , courses)

export default router