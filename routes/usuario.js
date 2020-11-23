const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

//Rota para registro
router.get('/registro', (req,res) => {
    res.render("usuarios/registro")
})

router.post('/registro', (req,res) => {
    //Validação de formulario de registro
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome invalido'})
    }
})


//Rota para login


module.exports = router
