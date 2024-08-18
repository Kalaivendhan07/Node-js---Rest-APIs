
const express=require('express');
const app=express();
const page=require('./pageRoute');


var port=8080;

app.listen(port,page);