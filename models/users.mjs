import mongoose from "mongoose"
const Schema = mongoose.Schema
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import jwtSecrets from "../config/jwt.mjs"

const usersSchema = new Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require : true ,
        type : String,
    },
    course:{
        type: [],
        require : true
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    address:{
        require: true,
        type: String
    },
    password:{
        type: String,
        require: true,
        minLength: 8
    },
    gender:{
        type: String,
    },
    type:{
        type: String,
        require: true
    },
    token:{
        default: [],
        type: []
    },
    img:{
        type: String,
        require: true
    }
})



// PASSWORD BCRYPTION
usersSchema.pre("save" , function(next){
    const user = this

    if(user.isModified('password')){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);

        user.password = hash
    }
        
    next()
})

usersSchema.methods.comparepassword = function (password){
    const userssss = this 
    return bcrypt.compareSync(password, userssss.password)

}

usersSchema.methods.generatetoken = function (){
    const {_id} = this
    var token = jwt.sign({ _id }, jwtSecrets);

    return token

}


const Useres =  mongoose.model('users' , usersSchema)
export default Useres