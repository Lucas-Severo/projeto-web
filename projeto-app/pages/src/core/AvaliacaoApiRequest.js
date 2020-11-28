import axios from 'axios'
import getCredentials from '../../../utils/getCredentials'

class AvaliacaoApiRequest {
    buscarPorId(id) {
        return axios.get(`http://localhost:1337/avaliacaos/${id}`)
    }

    salvar(comentario) {
        const userId = getCredentials.getUserId()
        const authorization = getCredentials.getUserToken()

        return axios.post('http://localhost:1337/avaliacaos', 
        {
            ...comentario,
            us_id: userId
        },
        {   
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        })
    }
}

export default new AvaliacaoApiRequest()