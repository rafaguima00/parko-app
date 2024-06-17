import imagemTopo from '../../assets/image_shop.png'

const infoEstacionamento = {
    id: 0,
    imagem: imagemTopo,
    nomeEstacionamento: "Estacionamento 1",
    localEstacionamento: "Largo do Pelourinho",
    localizacao: {
        latitude: -12.971407,
        longitude: -38.508357
    },
    distancia: "500 m",
    numeroVagas: "24 vagas",
    avaliacao: "4,5",
    horarioFuncionamento: "24 horas",
    taxaHoraExtra: "R$ 4,00",
    taxaCancelamento: "R$ 2,50",
    tempoTolerancia: "2 horas",
    horarios: [
        {
            id: 1,
            tempoPermanencia: "1 hora",
            preco: "R$ 10,00"
        },
        {
            id: 2,
            tempoPermanencia: "2 horas",
            preco: "R$ 12,00"
        },
        {
            id: 3,
            tempoPermanencia: "3 horas",
            preco: "R$ 14,00"
        },
        {
            id: 4,
            tempoPermanencia: "4 horas",
            preco: "R$ 16,00"
        }
    ]
}

export default infoEstacionamento;