export default function formatarValor(valor) {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',  
    });

    return formatter.format(valor)
}