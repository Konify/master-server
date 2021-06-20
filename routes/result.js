const express = require('express');
const nedb = require('nedb');

const infodb = new nedb('../modules/infodb.db');

infodb.loadDatabase()

const resultRouter = express.Router();

resultRouter.get('/', (req, res) => {
	infodb.find({}, (err, result) => {
		res.json(result);
	});
});

resultRouter.post('/', (req, res)=> {
	const {phone, password} = req.body

	if(phone && password ){
		infodb.insert(req.body, (err, result) => {
			res.status(201).json(result)
		});
	}else{
		res.send("Emnter password")
	}
});


module.exports = resultRouter;