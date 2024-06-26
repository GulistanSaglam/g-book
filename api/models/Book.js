const mongoose = require('mongoose');
const { Schema, model } = mongoose

const BookSchema = new Schema({
    title: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

const BookModel = model('Book', BookSchema)

module.exports = BookModel