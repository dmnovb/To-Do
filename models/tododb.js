const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: false
    },
    isComplete: {
        type:Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('todo', todoSchema)