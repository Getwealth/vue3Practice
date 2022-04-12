const express = require('express')
const hostname= 'localhost'
const user = require('./mock/user')
const port =3000
const app = express()
function loginMiddleware(req,res,next){
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next()

}
app.use(loginMiddleware)
app.get('/',(req,res)=>{
    res.json(user)
})

app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})