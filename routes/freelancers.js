const express = require('express');
const freelancers = require('../modules/user.json')
const nedb = require('nedb');

const users = new nedb('../modules/users');

users.loadDatabase()

const freelancerRouter = express.Router();

freelancerRouter.get('/', (req, res) => {
	users.find({}, {}, (err, result) => {
		res.json(result);
	});
});

freelancerRouter.post('/', (req, res) => {
	users.insert(req.body, (err, result) => {
		res.status(201).json(result);
	});
});


module.exports = freelancerRouter;