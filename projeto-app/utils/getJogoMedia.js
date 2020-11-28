class getJogoNota {

    getMedia(jogo) {
        let media = 0

        if (jogo.avaliacoes.length > 0) {
            for (let avaliacao of jogo.avaliacoes) {
                media += avaliacao.nota
            }

            media /= jogo.avaliacoes.length
        }
        return media.toFixed(2)
    }

}

export default new getJogoNota()