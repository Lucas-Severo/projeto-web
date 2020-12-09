import axios from 'axios'
import getCredentials from '../../../utils/getCredentials'

class VendaApiRequest {
    async realizarVenda(totalVenda) {
        const userId = getCredentials.getUserId()
        const authorization = getCredentials.getUserToken()

        return await axios.post('http://localhost:1337/vendas',
        {
            've_preco_total': totalVenda,
            'us_id': userId
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization
            }
        })
    }

    async buscarVendasPorUsuario(start, limit) {
        const userId = getCredentials.getUserId()
        const authorization = getCredentials.getUserToken()

        return await axios.get(`http://localhost:1337/vendas?us_id.id=${userId}&_start=${start}&_limit=${limit}&_sort=id`, {
            headers: {
                'Authorization': authorization
            }
        })
    }

    async countVendasPorUsuario() {
        const userId = getCredentials.getUserId()
        const authorization = getCredentials.getUserToken()

        return await axios.get(`http://localhost:1337/vendas/count?us_id.id=${userId}`, {
            headers: {
                'Authorization': authorization
            }
        })
    }
}

export default new VendaApiRequest()