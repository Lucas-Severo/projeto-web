const categorias = {
    'ACAO': 'Ação',
    'AVENTURA': 'Aventura',
    'ESTRATEGIA': 'Estratégia',
    'RPG': 'RPG',
    'ESPORTE': 'Esporte',
    'CORRIDA': 'Corrida',
    'JOGO_ONLINE': 'Jogo online'
}

export default function humanizarCategorias(categoria) {
    return categorias[categoria]
}