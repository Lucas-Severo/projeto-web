import axios from 'axios'

class JogoApiRequest {
    obterJogos() {
        return axios.get('http://localhost:1337/jogos')
    }

    obterJogo(id) {
        return axios.get(`http://localhost:1337/jogos/${id}`)
    }
}

export default new JogoApiRequest()