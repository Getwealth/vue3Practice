var http = require('http')
var path  =require('path')
var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
const hostname= 'localhost'
const port =3030

var app = express();

//设置引擎
app.set("views",path.join('views'))
app.set('view engine', 'ejs')

//设置留言全局变量
var entries = require('./mock/entries');

app.locals.entries=entries.data;
//使用Morgan进行日志记录
app.use(logger('dev'))

//设置用户表单提交动作信息的中间件买所有信息会保存在req.body
app.use(bodyParser.urlencoded({extended:false}))

//当访问网站根目录，就渲染主页
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/new-entry',(req,res)=>{
    res.render('new-entry')

})
//post动作
app.post('/new-entry',(req,res)=>{
    if(!req.body.title || !req.body.body){
        res.status(400).send("11111")
        return
    }
    entries.data.push({
        title:req.body.title,
        content:req.body.body,
        published:new Date()
    });
    res.redirect('/')

})
app.use((req,res)=>{
    res.status(404).render("404")
})
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`)
})