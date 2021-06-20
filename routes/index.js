const express = require('express');

const itemRouter = express.Router();

itemRouter.get('/', (req, res)=> {
	res.send('hiiiiiii')
});

module.exports = itemRouter;

