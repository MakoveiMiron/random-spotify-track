// Use ES6 import syntax
import axios from 'axios';

// Replace with your Client ID and Client Secret
const clientId = 'af3155f3c185435b87d73f104ff652d7';
const clientSecret = 'd64d8b0fdea5436bac7fc701691b40a8';

// Encode client_id and client_secret
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

// Spotify Token API URL
const url = 'https://accounts.spotify.com/api/token';

// Axios request
axios.post(url, new URLSearchParams({
  'grant_type': 'client_credentials'
}), {
  headers: {
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(response => {
  console.log('Access Token:', response.data.access_token);
})
.catch(error => {
  console.error('Error fetching the access token:', error.response ? error.response.data : error.message);
});
