const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');

const upload = multer({ dest: 'uploads/' });

require('./models/Product');
require('./models/Category');

const app = express();

app.use(bodyParser.json());

mongoose.connect(
	'secretttttt');

const Product = mongoose.model('product');
const Category = mongoose.model('category');

app.get('/', async (req, res) => {
	try {
        const categories = await Category.find().populate('products').exec();
        res.send(categories);
	} catch (error) {
		console.log(error);
	}
	
});

app.post('/product/new', upload.array('photos', 12), async (req, res) => {
	try {
		const { name, description, price, category } = req.body;
		const images = [];
		req.files.forEach(file => {
			images.push({ src: file.path });
		});
		const newProduct = await new Product({
			name,
			description,
			images,
			price,
			category
		}).save();
		const productCategory = await Category.findById(category);
		productCategory.products.push(newProduct);
		await productCategory.save();
		res.send({});
	} catch (error) {
		console.log(error);
	}
});

app.post('/category/new', async (req, res) => {
	const { name } = req.body;
	await new Category({ name }).save();
	res.send({});
});

app.use('/img', express.static('uploads'))

app.listen(5000);
