//1 To automatically load .env file into our application
require('dotenv').config()

//2 import express,cors
const express=require('express')
const cors=require('cors')

// import db connection
require('./DB/connection')

// import router
const router = require('./Routes/router')

//3 create server application
const server=express()

// use server
server.use(cors())
server.use(express.json())
server.use(router)

//5 define port
const PORT=5000

//4 run application
server.listen(PORT,()=>{
    console.log('server listening on port:'+PORT);
})

// route - localhost:5000
server.get('/',(req,res)=>{
    res.status(200).json('E Cart server is started')
})