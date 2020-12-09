import axios from 'axios'
import getCredentials from '../../../utils/getCredentials'

class ItemVendaApiRequest {
    async cadastrarItensVenda(itens, venda) {
        const authorization = getCredentials.getUserToken()

        itens = itens.map(item => ({
            ...item,
            jg_id: item.id,
            ve_id: venda.id
        }))

        for(let item of itens) {
            await axios.post('http://localhost:1337/item-vendas',
                item,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': authorization
                    }
                }
            )
        }
    }
}

export default new ItemVendaApiRequest()