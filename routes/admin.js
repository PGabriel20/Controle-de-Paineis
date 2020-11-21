const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Cliente')
const Cliente = mongoose.model('clientes')
require('../models/Painel')
const Painel = mongoose.model('paineis')

//Rotas
router.get('/',(req,res)=>{
    res.render('admin/index')
})

//Lista paineis
router.get('/paineis',(req,res)=>{
    Painel.find().lean().populate('cliente').sort({data: 'desc'}).then((paineis)=>{
        res.render('admin/paineis',{paineis: paineis})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar paineis!")
        res.redirect('/admin')
    })
})

router.get('/paineis/add',(req,res)=>{
    Cliente.find().lean().then((clientes)=>{
        res.render('admin/addpainel',{clientes: clientes})
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao carregar o formulario!")
        res.redirect('/admin')
    })
})

router.post('/paineis/novo',(req,res)=>{
    //Codigo para salvar painel no banco
    const novoPainel = {
        codigo: req.body.codigo,
        cliente: req.body.cliente,
        descricao: req.body.descricao,
        montador: req.body.montador,
        num_pedido: req.body.num_pedido,
        ordem: req.body.ordem
    }

    new Painel(novoPainel).save().then(()=>{
        console.log('Painel salvo com sucesso!')
        req.flash('success_msg', "Painel criado com sucesso!")
        res.redirect('/admin/paineis')
    }).catch((err)=>{
        console.log('Erro ao criar painel!')
    })
})

//Pesquisa painel e redireciona para form de edição
router.get('/paineis/edit/:id',(req,res)=>{
    Painel.findOne({_id: req.params.id}).lean().then((painel)=>{
        Cliente.find().lean().then((clientes)=>{
            res.render('admin/editpainel', {clientes: clientes, painel: painel})
        }).catch((err)=>{
            req.flash('error_msg','Houve um erro ao carregar painel!')
            res.redirect('/admin')
        })
    }).catch((err)=>{
        req.flash('error_msg','Houve um erro ao carregar formulario de edição!')
        res.redirect('/admin')
    })
    
})

//Salva dados do formulario de edição
router.post('/paineis/edit',(req,res)=>{

    Painel.findOne({_id: req.body.id}).then((painel)=>{

        painel.codigo = req.body.codigo,
        painel.cliente = req.body.cliente,
        painel.descricao = req.body.descricao,
        painel.montador = req.body.montador,
        painel.num_pedido = req.body.num_pedido,
        painel.ordem = req.body.ordem

        painel.save().then(()=>{
            req.flash('success_msg','Painel salvo co sucesso!')
            res.redirect('/admin/paineis')
        }).catch((err)=>{
            req.flash('error_msg','Houve um erro interno!')
            res.redirect('/admin/paineis')
        })

    }).catch((err)=>{
        console.log(err)
        req.flash('error_msg','Houve um erro ao salvar o painel!')
        res.redirect('/admin/paineis')
    })
})


router.get('/paineis/deletar/:id',(req,res)=>{
    Painel.deleteOne({_id: req.params.id}).then(()=>{
        req.flash('success_msg','Painel deletado com sucesso!')
        res.redirect('/admin/paineis')
    }).catch((err)=>{
        req.flash('error_msg','Houve um erro ao deletar o painel!')
        res.redirect('/admin')
    })
})


//Cadastrar cliente
router.get('/clientes/novo',(req,res)=>{
    //Inserindo dados de cliente no banco, para aparecer no formulario de painel
    new Cliente({
        nome: "Cliente #3",
        cpf: 11112300,
        telefone: 0555300000,
        cidade: "Espírito santo do pinhal",
        
    }).save().then(()=>{
        console.log("Cliente registrado com sucesso!")
    }).catch((err)=>{
        console.log("Houve um erro ao registrar cliente: "+err)
    })
})




module.exports = router