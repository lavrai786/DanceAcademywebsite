const express=require('express');
const app=express();
const path=require('path');
const port=8000;
const fs=require('fs');

app.use('/static',express.static('static'));
app.use(express.urlencoded())


app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'))

app.get('/contact',(req,res)=>{
    const params={}
    res.status(200).render('contact.pug',params);
})
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('index.pug',params);
})
app.get('/home',(req,res)=>{
    const params={}
    res.status(200).render('home.pug',params);
})
app.post('/contact',(req,res)=>{
    name=req.body.name
    email=req.body.email
    phone=req.body.phone
    address=req.body.address
    desc=req.body.desc

    let outputTowrite=`The name of the person is ${name} and email is ${email},number is ${phone},address is ${address} and more about the perso is ${desc}`
    fs.writeFileSync('output.txt',outputTowrite)
    const params={"message":"You have been submitted Sucessfully...."}
    res.status(200).render('contact.pug',params);
})
app.listen(port,()=>{
    console.log(`app is started at port number ${port}`);
})