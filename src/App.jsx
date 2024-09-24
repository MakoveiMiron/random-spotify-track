import { useState } from 'react';
import { getTrack } from './apiCall';
import './App.css';

function App() {
    const [trackData, setTrackData] = useState({
        track: "",
        album: "",
        artist: ""
    });

    async function handleClick() {
        const result = await getTrack();
        console.log("result", result);

        if (result && result.tracks.items.length > 0) {
            setTrackData({
                track: result.tracks.items[0].name,
                album: result.tracks.items[0].album.name,
                artist: result.tracks.items[0].artists[0].name
            });
        } else {
            console.log("No track found");
            setTrackData({
              track: "",
              album: "",
              artist: ""
            })
        }
    }

    return (
        <>
            <div className='container'>

            {trackData.track ? (
                <div className='result'> 
                    <h1>Track found!</h1>
                    <h2>
                        Artist: {trackData.artist} | Album: {trackData.album} | Track: {trackData.track}
                    </h2>
                </div>
            ) : (
                <h2>No track found. Try again!</h2>
            )}
            
            <button id='button' onClick={handleClick}>Search for random track on Spotify!</button>       
            
            </div>
        </>
    );
}

export default App;
