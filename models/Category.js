const mongoose = require('mongoose');
const { Schema } = mongoose;
const ProductSchema = require('./Product');

const categorySchema = new Schema({
    name: String,
	products: [{type: Schema.Types.ObjectId, ref: 'product'}],
});

mongoose.model('category', categorySchema);
