const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Painel = new Schema({
    codigo:{
        type: Number,
        required: true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'clientes',
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    montador:{
        type: String,
        required: true
    },
    num_pedido:{
        type: Number,
        required: true
    },
    ordem:{
        type: String,
        required: true
    },
    dt_registro:{
        type: Date,
        default: Date.now()
    },
    dt_pedido:{
        type: String,
        required: true
    },
    dt_previsao:{
        type: String,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    observacao:{
        type: String,
        required: false
    }
})

mongoose.model('paineis', Painel)