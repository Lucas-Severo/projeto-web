class getCredentials {

    getUserToken() {
        const token = sessionStorage.getItem('Authorization')

        if (token && typeof token === 'string') {
            return token
        }
    }

    getUserId() {
        const userId = sessionStorage.getItem('UserId')

        return userId
    }

}

export default new getCredentials()