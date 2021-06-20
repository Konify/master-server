const express = require('express');
const neDb = require('nedb')
const items = new neDb('./modules/items.db')

items.loadDatabase()


const itemRouter = express.Router();

itemRouter.get('/', (req, res) => {
	items.find({}, {}, (err, result) =>{
		if(err) throw err
		res.send(result);
	})
});

module.exports = itemRouter;