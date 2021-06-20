const express = require('express');
const nedb = require('nedb');

const info = new nedb('../modules/info.db');

info.loadDatabase()

const resultRouter = express.Router();

resultRouter.get('/', (req, res) => {
	info.find({}, (err, result) => {
		res.json(result);
	});
});

resultRouter.post('/', (req, res)=> {
	const {phone, password} = req.body

	if(phone && password ){
		info.insert(req.body, (err, result) => {
			res.status(201).json(result)
		});
	}else{
		res.send("Emnter password")
	}
});

// info.insert({phone:"+2119541222", password:"444444444", index:"451222"});

module.exports = resultRouter;