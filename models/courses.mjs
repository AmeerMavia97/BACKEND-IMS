import mongoose from "mongoose"
const Schema = mongoose.Schema


const CoursesSchema = new Schema({
    courseName:{
        require: true,
        type: String
    },
    weekDay:{
        require: true,
        type: String
    },
    teacherName:{
        require: true,
        type: String
    }

})

const courses =  mongoose.model('Courses' , CoursesSchema)
export default courses