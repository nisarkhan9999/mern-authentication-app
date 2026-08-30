import express from "express"
const route = express.Router()
import {signupUser,loginUser,userFind} from "../controller/userController.js"


route.get('/signup',(req,res)=>{
    res.render("signup")
})
route.post("/signup",signupUser)

route.get("/login",(req,res)=>{
    res.render("login")
})
route.post("/login",loginUser)
route.get("/dashboard",userFind,(req,res)=>{
res.send("welcome to dashboard")
})

export default route