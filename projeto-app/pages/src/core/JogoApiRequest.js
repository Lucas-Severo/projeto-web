import axios from 'axios'

class JogoApiRequest {
    obterJogos(start, limit) {
        return axios.get(`http://localhost:1337/jogos?_start=${start}&_limit=${limit}&_sort=id`)
    }

    obterJogo(slug) {
        return axios.get(`http://localhost:1337/jogos?slug=${slug}`)
    }

    countJogos() {
        return axios.get('http://localhost:1337/jogos/count')
    }

    atualizarMedia(id) {
        return axios.patch(`http://localhost:1337/jogos/${id}/average`)
    }
}

export default new JogoApiRequest()