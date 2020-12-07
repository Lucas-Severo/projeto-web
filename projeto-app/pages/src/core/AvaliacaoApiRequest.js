import axios from 'axios'
import getCredentials from '../../../utils/getCredentials'

class AvaliacaoApiRequest {
    buscarPorId(id) {
        return axios.get(`http://localhost:1337/avaliacaos/${id}`)
    }

    buscarTodos(jogoId, start, limit) {
        return axios.get(`http://localhost:1337/avaliacaos?jg_id.id=${jogoId}&_start=${start}&_limit=${limit}&_sort=id`)
    }

    countAvaliacoes(jogoId) {
        return axios.get(`http://localhost:1337/avaliacaos/count?jg_id.id=${jogoId}`)
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