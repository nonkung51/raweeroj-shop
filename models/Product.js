const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
	name: String,
	images: [{ src: String }],
	description: String,
	price: Number,
	category: {type: Schema.Types.ObjectId, ref: 'category'}
});

mongoose.model('product', productSchema);
module.exports = productSchema;
