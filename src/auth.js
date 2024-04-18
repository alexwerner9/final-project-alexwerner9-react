
export function isLoggedIn() {
    console.log("LOGIN TOKEN", localStorage.getItem('loginToken'))
    return localStorage.getItem('loginToken')
}
