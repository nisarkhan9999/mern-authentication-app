import express, { urlencoded } from "express"
const app = express()
import session from "express-session"
import  mongoose  from "mongoose"
import dotenv from "dotenv"
import route from "./routes/singup.js"
dotenv.config()
app.set("view engine", "ejs") 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const port= 3000

app.listen(3000,()=>{
    console.log(`server is running on port ${port}`)
})



mongoose.connect(process.env.MONGODB_URI)
.then(()=>{console.log("connected")})

app.get("/",(req,res)=>{
    res.send("home page")
})
app.use(session({
  secret: "mySecretKey",
  resave: false,
  saveUninitialized: true
}))
app.use("/",route)