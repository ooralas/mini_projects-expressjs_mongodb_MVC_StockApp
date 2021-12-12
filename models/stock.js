const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const stockSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    products: [String]
});

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock;