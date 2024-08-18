const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const morgan=require('morgan');
const mysql=require('mysql');

app.use('/',(req,res)=>{
    res.status(200).json({
        message:"sucuss"
    })
})

app.use('order',(req,res)=>{
    res.status(200).json({
        message:"ordered"
    })
})