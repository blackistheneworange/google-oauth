
const {google} = require('googleapis');

exports.oauth2Client=function(){

	const oauth2Client = new google.auth.OAuth2(
  "445840600134-gcl3c8jg9tia6vc4j0hnt2jvvtollnfs.apps.googleusercontent.com",
  "t7t9VaxLFNwx3e5MPXJC9itH",
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

