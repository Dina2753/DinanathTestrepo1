const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: false
    },


})
const Book = mongoose.model('book', bookSchema);
module.exports = Book;