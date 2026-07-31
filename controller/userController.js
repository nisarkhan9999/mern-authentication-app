import bcrypt from "bcrypt"
import { newSchema } from "../model/user.js"


const signupUser= async (req,res)=>{
try {
const {name,email,password}=req.body

const hashedPass =await bcrypt.hash(password,10)

const newUser = new newSchema({name,email, password:hashedPass})
await newUser.save()
res.send("signup successfull")
        
    } catch (error) {
        res.send(error)
    }
}

const loginUser= async (req,res)=>{
    try {
const {email,password}=req.body
     if (!email || !password) {
     return res.send ("please provide email and password")       
     } 

     const findEmail = await newSchema.findOne({email}) 
     if(!findEmail){
     return res.send ("please provide valid email ")       
     
     } 
     const comparepass = await bcrypt.compare(password,findEmail.password)

 if(!comparepass){
     return res.send ("password is incorrect ")       
     } 

req.session.user = findEmail 
     res.send("login successful")

    } catch (error) {
        res.send("some thing went wrong")
    }
}

function userFind(req,res,next) {
    if (!req.session.user) {
     return   res.send("please login first")
    }
   next() 
}






export  {signupUser,loginUser,userFind}