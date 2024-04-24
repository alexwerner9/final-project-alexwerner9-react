import './Track.css'

function Track(props) {
    function clickEvent() {
        console.log(props.spotifyUrl)
        if(props.spotifyUrl) {
            window.open(props.spotifyUrl, '_blank').focus()
        } else {
            alert("No link found for this track. It was probably added before links were implemented.")
        }
    }
    return (
        <div className="track" onClick={clickEvent}>
            <div className="track-info">{props.name} - <em>{props.artist}</em></div>
            <div className="added-by">Added by: {props.addedBy}</div>
        </div>
    )
}

export default Track
