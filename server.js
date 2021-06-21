// require('dotenv');

const express = require('express');
const app = express();
let bodyParser = require('body-parser')
const neDb = require('nedb') 
const bcryptjs = require('bcryptjs')
const itemRouter = require('./routes/items');
const freelancerRouter = require('./routes/freelancers');
app.use(bodyParser.json())
const cors = require('cors')
app.use(cors())
const items = new neDb('./modules/items.db')
const resultData = new neDb('./modules/resultData.db')

items.loadDatabase()
resultData.loadDatabase()


app.use('/items', itemRouter)
app.use('/freelancers', freelancerRouter)


app.get('/result', (req, res) => {
	resultData.find({}, (err, result) => {
		res.json(result);
	});
});

app.post('/result', (req, res)=> {
	const {phone, password} = req.body

	if(phone && password ){
		resultData.insert(req.body, (err, result) => {
			res.status(201).json(result)
		});
	}else{
		res.send("Emnter password")
	}
});

// sign up new user
app.post('/signup', async (req, res)=> {
	try{
		const {password} = req.body 
		const hash = await bcryptjs.hash(password, 10)
		const newUser = {...req.body, password:hash}
		users.insert(newUser, (error, result) => {
			result ? res.status(201).json(req.body) : res.status(404).json({message:"Sorry Something went wrong!"})
		})
	}catch(err){
		console.log(err)
	}
});

// login user
app.post('/login', async (req, res)=> {
	try{
		users.find({email:req.body.email}, async (err, result) => {
			if(err) throw err
			if(result.length >= 1){
				const hash = await result[0].password
				const verification = await bcryptjs.compare(req.body.password, hash)
				if(verification){
					res.status(201).json({
						name:result[0].name, 
						email:result[0].email, 
						phone:result[0].phone, 
						avatar:result[0].avatar,
						id:result[0]._id
					}) 
				}else{
					res.send("incorrect password!")
				}
			}else{
				res.send('no user found with this email!')
			}
		})
	}catch(err){
		res.status(404).send('eror')
	}
});



app.listen(process.env.PORT || 5000 , ()=> console.log('server is running on port 5000'));

