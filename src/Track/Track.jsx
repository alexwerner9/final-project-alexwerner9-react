import './Track.css'

function Track(props) {
    return (
        <div className="track">
            <div className="track-info">{props.name} - <em>{props.artist}</em></div>
            <div className="added-by">Added by: {props.addedBy}</div>
        </div>
    )
}

export default Track
