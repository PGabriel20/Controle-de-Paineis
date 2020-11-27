const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')
require('../models/Cliente')
const Cliente = mongoose.model('clientes')
const bcrypt = require('bcryptjs')
const passport = require('passport')

//Rota para registro
router.get('/registro', (req,res) => {
    res.render("usuarios/registro")
})

router.post('/registro', (req,res) => {

    //Validação de formulario de registro
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: 'Nome invalido!'})
    }
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: 'Email invalido!'})
    }
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: 'Senha invalida!'})
    }
    if(req.body.senha.length<4){
        erros.push({texto: 'Senha muito pequena!'})
    }
    if(req.body.senha != req.body.senha2){
        erros.push({texto: 'Senhas não batem!'})
    }
    if(erros.length>0){
        res.render('usuarios/registro', {erros: erros})
    }
    else{

        //Verifica se email já existe
        Usuario.findOne({email: req.body.email}).then((usuario)=>{
            if(usuario){
                req.flash('error_msg', 'Já existe uma conta com este email!')
                res.redirect('/usuarios/registro')
            }else{

                const novoUsuario = new Usuario({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                })

                bcrypt.genSalt(10, (erro, salt)=>{
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
                        if(erro){
                            req.flash('error_msg', 'Houve um erro interno!')
                            res.redirect('/')
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(()=>{
                            req.flash('success_msg', 'Usuario cadastrado com sucesso!')
                            res.redirect('/')
                        }).catch((err)=>{
                            req.flash('error_msg', 'Houve um erro ao cadastrar usuario, tente novamente!')
                            res.redirect('/usuarios/registro')
                        })

                        //Cadastra clientes modelo para primeiro uso de aplicação
                        //Os clientes serao cadastrados apenas apos o registro do primeiro usuario
                        //Em usos convencionais, os clientes seriam cadastrados via formulário

                        //Inserindo dados de cliente no banco, para aparecer no formulario de painel
                        function cadastrar(){
                            new Cliente({
                                nome: "Cliente #1",
                                cpf: 11120000,
                                telefone: 055530000,
                                cidade: "Espírito santo do pinhal",
                                
                            }).save().then(()=>{
                                console.log("Cliente registrado com sucesso!")
                            }).catch((err)=>{
                                console.log("Houve um erro ao registrar cliente: "+err)
                            })

                            new Cliente({
                                nome: "Cliente #2",
                                cpf: 11120000,
                                telefone: 055530000,
                                cidade: "Espírito santo do pinhal",
                                
                            }).save().then(()=>{
                                console.log("Cliente registrado com sucesso!")
                            }).catch((err)=>{
                                console.log("Houve um erro ao registrar cliente: "+err)
                            })

                            new Cliente({
                                nome: "Cliente #3",
                                cpf: 11120000,
                                telefone: 055530000,
                                cidade: "Espírito santo do pinhal",
                                
                            }).save().then(()=>{
                                console.log("Cliente registrado com sucesso!")
                            }).catch((err)=>{
                                console.log("Houve um erro ao registrar cliente: "+err)
                            })
                        }


                        Cliente.findOne({nome: "Cliente #1"},(err, cliente)=>{
                            if(err){
                                console.log(err)
                            }
                            if(cliente){
                                console.log('Os clientes ja foram cadastrados uma vez!')
                            }
                            else{
                                console.log('Pode cadastrar!')
                                cadastrar()
                            }
                        })

                    })
                })

            }
        }).catch((err)=>{
            req.flash('error_msg', 'Houve um erro interno!')
            res.redirect('/')
        })
    }

})


//Rota para login
router.get('/login', (req,res) => {
    if(req.user){
        req.flash('error_msg','Você já está logado!')
        res.redirect('/')
    }
    else{
        res.render("usuarios/login")
    }
})

router.post('/login', (req,res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/usuarios/login',
        failureFlash: true
    })(req,res,next)
})

//Rota para logout
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router
