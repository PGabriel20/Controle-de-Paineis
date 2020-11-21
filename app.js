const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app  = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')


//Configurações
    //Sessão
    app.use(session({
        secret: "qualquerchave",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    //Variaveis globais (mensagens flash)
    app.use((req, res, next) =>{
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    //Body-parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

    //Publico
    app.use(express.static(path.join(__dirname,'public')))

    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/actualapp').then(()=>{
            console.log("Conectado ao Mongodb!")
        }).catch((err)=>{
            console.log("Erro ao se conectat ao Mongodb: "+err)
        })

    

//Rotas
app.use('/admin', admin)

app.get('/',(req,res)=>{
    res.render('index')
})



//Outros
const PORT = 8001
app.listen(PORT, ()=>{
    console.log('Servidor rodando...')
})