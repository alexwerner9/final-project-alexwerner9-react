
import Track from '../Track/Track.jsx'
import './TrackPane.css'

function TrackPane(props) {
    if(props.tracks.length) {
        return (
            <div id="track-pane">
                <ol>
                    {props.tracks.map((elem, index) => {
                            return <li key={elem.spotifyUrl}>
                                        <Track 
                                            index={index+1} 
                                            name={elem.name} 
                                            artist={elem.artist} 
                                            spotifyUrl={elem.spotifyUrl} 
                                            addedBy={elem.addedBy} />
                                    </li>
                        })}
                </ol>
            </div>
        )
    } else {
        return <div id="no-tracks">Tracks will appear here.</div>
    }
}

export default TrackPane
