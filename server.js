const express=require('express')
const path=require('path')
const {oauth2Client,googleLogin}=require('./googleLogin');
const axios=require('axios')
const app=express();

app.set('view engine','ejs')

app.get('/',(req,res)=>{
	res.render('index')
})

app.get('/login/google',async (req,res)=>{
	
	const client=oauth2Client();
	const url=await googleLogin(client)
	
	res.redirect(url)
})

app.get('/user',async (req,res)=>{
	const client=oauth2Client()

	try{
		const {tokens} = await client.getToken(req.query.code)

	if(!tokens.access_token){
		return res.redirect('/login/google')
	}
	else{
	       tokens.access_token?res.setHeader('Authorization','Bearer '+tokens.access_token):''
	}

	const token=tokens.access_token||req.headers['Authorization'].split(' ')[1];
	
	axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token='+token)
	.then(ares=>{
		res.render('user',{
			email:ares.data.email,
			name:ares.data.name,
			picture:ares.data.picture
		})
	})
	.catch(err=>console.log('error',err))

	}
	catch(e){
		res.redirect('/login/google')
	}

})

app.listen(3000,()=>{
	console.log('Listening')
})
