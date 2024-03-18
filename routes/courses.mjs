import express from "express";
const router = express.Router()
import courses from "../models/courses.mjs";


// GET ALL COURSE ROUTE
router.get('/allcourse' , async (req , res)=>{

    const Allcourse = await courses.find()
    res.send({Data: Allcourse})

})


// ADD COURSE ROUTE
router.post('/addcourse' , async (req , res)=>{

    const {teacherName , courseName , weekDay} = req.body
    console.log({teacherName , courseName , weekDay});
    try {
        const AddCourses = await courses.create({teacherName , courseName , weekDay})
        res.send({message: "Add Course Successfully"})

    } catch (error) {
        res.send({message: error})
    }

})

export default router