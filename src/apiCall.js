import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "./constans";
import { artists } from "./artists";

let accessToken = null;
let tokenExpirationTime = null;

// Function to get a new access token
async function fetchAccessToken() {
    const url = 'https://accounts.spotify.com/api/token';
    const encodedCredentials = btoa(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Error fetching token: ${response.statusText}`);
    }

    const data = await response.json();
    accessToken = data.access_token;

    // Set token expiration to one hour from now
    tokenExpirationTime = Date.now() + data.expires_in * 1000; 
}

// Function to get a valid access token
async function getAccessToken() {
    if (!accessToken || Date.now() >= tokenExpirationTime) {
        await fetchAccessToken();
    }
    return accessToken;
}

// Function to get a random artist from the list
function getRandomArtist() {
    const randomIndex = Math.floor(Math.random() * artists.length);
    return artists[randomIndex];
}

// Function to get a random limit
function getRandomLimit() {
    return Math.floor(Math.random() * 20) + 1; 
}

export async function getTrack() {
    const baseUrl = 'https://api.spotify.com/v1/search';
    const selectedArtist = getRandomArtist(); 
    const artistName = selectedArtist.name; 
    const countryCode = selectedArtist.country;
    const query = `artist:${artistName}`;

    const token = await getAccessToken();

    const url = `${baseUrl}?q=${encodeURIComponent(query)}&market=${countryCode}&limit=${getRandomLimit()}&type=track`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
