// Function to get a random search string
function getRandomQuery(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let randomSearch = '';

    for (let i = 0; i < length; i++) {
        const randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length));
        randomSearch += randomCharacter;
    }

    return randomSearch;
}

// Function to get a random market
function getRandomMarket() {
    const markets = [
        'US', 'GB', 'FR', 'DE', 'JP', 'CA', 'AU', 'IN', 'BR', 'IT', 
        'ES', 'MX', 'NL', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'CH', 
        'BE', 'AT', 'NZ', 'SG', 'HK', 'KR', 'MY', 'TH', 'ID', 'PH', 
        'ZA', 'CL', 'AR', 'EG', 'AE', 'IL', 'RU', 'PL', 'HU', 'CZ', 
        'SK', 'RO', 'GR', 'BG', 'LT', 'LV', 'EE', 'SI', 'HR', 'TR'
    ];
    return markets[Math.floor(Math.random() * markets.length)];
}

// Function to get a random limit
function getRandomLimit() {
    return Math.floor(Math.random() * 20) + 1; // Random limit between 1 and 20
}
export function getTrack(){


    const baseUrl = 'https://api.spotify.com/v1/search';
    const queryLength = 5; 
    const query = getRandomQuery(queryLength);
    const market = getRandomMarket();
    const limit = getRandomLimit();

    const url = `${baseUrl}?q=${encodeURIComponent(query)}&market=${market}&limit=${limit}&type=track`;


    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer d64d8b0fdea5436bac7fc701691b40a8' // Replace with a valid token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}
