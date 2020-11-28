import axios from 'axios'

class AuthenticateApiRequest {
    autenticar(email, password) {
        return axios.post('http://localhost:1337/auth/local', {
            identifier: email,
            password: password
        })
    }

    register(userName, email, password) {
        return axios.post('http://localhost:1337/users', {
            username: userName,
            email: email,
            password: password
        })
    }
}

export default new AuthenticateApiRequest()