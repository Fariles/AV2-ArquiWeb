const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    id : {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    dataDeCriacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataDeModificacao: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)