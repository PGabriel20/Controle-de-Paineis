const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app  = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')(passport)


//Configurações
    //Sessão
    app.use(session({
        secret: "qualquerchave",
        resave: true,
        saveUninitialized: true
    }))

    //Passport
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    //Variaveis globais (mensagens flash)
    app.use((req, res, next) =>{
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
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
    app.use(express.static('public/img'))

    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost/actualapp').then(()=>{
            console.log("Conectado ao Mongodb!")
        }).catch((err)=>{
            console.log("Erro ao se conectat ao Mongodb: "+err)
        })

    

//Rotas
app.use('/admin', admin)
app.use('/usuarios', usuarios)
app.get('/',(req,res)=>{
    res.render('index')
})

//Outros
const PORT = process.env.PORT || 8001
app.listen(PORT, ()=>{
    console.log('Servidor rodando...')
})