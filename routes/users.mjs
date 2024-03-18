import express from "express";
const router = express.Router()
import Useres from "../models/users.mjs";

router.get('/' , async (req , res)=>{
    // res.send("hello")
    const users = await Useres.find()
    console.log(users);
    res.send({data: users})

})



// REGISTER USER ROUTE
router.post('/registers' , async (req , res)=>{
    try {
    // const {fullname , email , password , contactNum} = req.body

    // STEP 2 PASSWORD ENCRYPT IN UsER SCHEMA FILE 

    // STEP 3 USER CREATE AND SAVE IN MONGOOSE
    const users = await Useres.create(req.body)

    res.send({message: "REGISTER USER" , User: users})
    
    } catch (error) {
        res.send(error)
        
    }
})

router.get('/:id' , async (req , res) =>{
    const {id} = req.params
    try {
        const user = await Useres.findById(id)
        res.send({user: user})
    } catch (error) {
        res.send({message: "User Not Found"})
    }
})


// LOGIN USER ROUTE
router.put('/logins' , async (req , res)=>{
    try {
    const email = req.body.email
    const password = req.body.password
    console.log(req.body);


        const user = await Useres.findOne({email})

        if(!user){
            res.send({message: "USER NOT FOUND" })
            return
        }

        // COMPARE BCRYPTJS PASSWORD IN USER PASSWORD
        const correctpassword = user.comparepassword(password)

        if(!correctpassword){
            res.send({message: 'Invalid Password'})
        }

        // GENERATE TOKEN 
        const token = user.generatetoken()
        user.token.push(token)

        await user.save()



        res.send({ message: 'User logged in successfully!', token , user: user })

        // console.log(correctpassword);

    } catch (error) {
        console.log(error);
        
    }
})


router.delete('/deleteusers:id' , async  (req , res)=>{
try {
    const id = req.params.id
    console.log(id);

    const student = await Useres.findOneAndDelete({ _id: id})

    if(!student){
        res.send({message: "User not found"})
    }else{
        res.send({message: "User delete"})
    }
} catch (error) {
    res.send(error)
}

})


export default router