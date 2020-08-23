
const {google} = require('googleapis');

exports.oauth2Client=function(){

	const oauth2Client = new google.auth.OAuth2(
  'CLIENT ID",
  "CLIENT KEY",
  'http://localhost:3000/user'
);
return oauth2Client;
}

exports.googleLogin=async function(oauth2Client){
 

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];
 
const url = await oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
});

	
	return url;

	/*
const {tokens} = await oauth2Client.getToken(code)
oauth2Client.setCredentials;*/

}

