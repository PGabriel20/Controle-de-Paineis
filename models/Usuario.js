const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    eAdmin:{
        type: Number,
        default: 1
        //Deixar em admin por padrão
        //Ao mudar para 0, apenas usuarios normais serão cadastrados
    },
    senha:{
        type: String,
        required: true
    }
})

mongoose.model('usuarios', Usuario)