const express = require('express')
const morgan = require('morgan')
const dotenv=require('dotenv');
const cors=require('cors')

const routes =require('./Routes/route')
const mongoose=require('mongoose')


//configure env
dotenv.config();

//rest object
const app =express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1',routes)


//Data base Configuration
const connectDB =  async ()=>{
   
  try{
      const conn = await mongoose.connect("mongodb+srv://Jagcho:71nEXJtXcYfVx8T6@cluster0.5bg4mzz.mongodb.net/Leave-Management",{  
          useNewUrlParser: true,
      })
      console.log(`mongo database is connected!!! ${conn.connection.host} `)
  }catch(error){
      console.error(`Error: ${error} `)
  }

}

connectDB()

//Server Port Configuration
const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(
        `Server Running on port ${PORT}`
      );
})