import Button from '../Button/Button.jsx'
import Header from '../Header.jsx'
import { useNavigate } from "react-router-dom";

function NotLoggedIn() {
    const navigate = useNavigate();
    const createNewPlaylistOnClick = evt => {
        alert("CREATE PLAYLIST")
    }

    const loginOnClick = evt => {
        navigate('/login')
    }
    return (
        <div id="main-div">
        <Header text="Welcome!" />
        <Button text="Log in" clickEvent={loginOnClick} />
    </div>
    )
}

export default NotLoggedIn
