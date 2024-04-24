import './Header.css'

function Header(props) {
    return (
        <div>
            <p className="header">{props.text}</p>
        </div>
    )
}

export default Header