const mongoose = require("mongoose")

const todosSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model("Todo", todosSchema)