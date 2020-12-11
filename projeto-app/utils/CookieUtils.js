import Cookies from 'js-cookie'

class CookieUtils {

    addCookie(key, value) {
        Cookies.set(key, value)
    }

    removeCookie(key) {
        Cookies.remove(key)
    }

    getCookie(key) {
        return Cookies.get(key)
    }

}

export default new CookieUtils()