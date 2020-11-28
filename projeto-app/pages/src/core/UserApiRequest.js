import axios from 'axios'

class UserApiRequest {
    buscarPorId(id) {
        return axios.get(`http://localhost:1337/users/${id}`)
    }
}

export default new UserApiRequest()