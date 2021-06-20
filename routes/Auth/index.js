const express = require('express');

const auth_router = express.Router();

auth_router.get('/', (req, res)=> {
	res.send('user route')
});

module.exports = auth_router;

