var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var listSchema = new Schema({
    termino: { type: String, required: [true, 'El campo no puede recibir datos vacios'] },

}, { collection: 'list' });

module.exports = mongoose.model('List', listSchema);