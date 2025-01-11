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
            tempoPermanencia: 1,
            preco: 10
        },
        {
            id: 2,
            tempoPermanencia: 2,
            preco: 12
        },
        {
            id: 3,
            tempoPermanencia: 3,
            preco: 14
        },
        {
            id: 4,
            tempoPermanencia: 4,
            preco: 16
        }
    ]
}

export default infoEstacionamento