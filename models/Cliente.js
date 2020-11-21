const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Cliente = new Schema({
    nome:{
        type: String,
        required: true
    },
    telefone:{
        type: Number,
        required: true
    },
    cpf:{
        type: Number,
        required: true
    },
    cidade:{
        type: String,
        required: true
    }
})

mongoose.model('clientes', Cliente)
