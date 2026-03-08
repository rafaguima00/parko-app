import { useUser } from "../Context/dataUserContext"
import { useReservation } from "../Context/reservaContext"
import api from "./api"

const ReadApi = () => {

    const { setEstacionamentos, setPriceTable, setVeiculos, setUsers } = useUser()
    const { setReservations, setTabelaFixa } = useReservation()

    const loadParkings = async (id) => {
        await api.get(`/establishments/${id}`)
            .then(res => {
                setEstacionamentos(res.data)
            })
            .catch(e => {
                console.log(`Erro ao carregar estacionamentos: ${e}`)
            })
    }

    const loadPriceTable = async (idEstacionamento) => {
        await api.get(`tabela_preco/${idEstacionamento}`)
            .then(res => {
                setPriceTable(res.data)
            })
            .catch(e => {
                console.log(`Erro ao carregar tabela de preço: ${e}`)
            })
    }

    const loadVehicles = async (id) => {
        await api.get(`vehicles/${id}`)
            .then(res => {
                setVeiculos(res.data)
            })
            .catch(e => {
                console.log(`Erro ao carregar veiculos: ${e}`)
            })
    }

    const loadUsers = async () => {
        await api.get("/users")
            .then(res => {
                setUsers(res.data)
            })
            .catch(e => {
                console.log(`Erro ao carregar usuários: ${e}`)
            })
    }

    const loadReservations = async (id) => {
        try {
            const res = await api.get(`/reservations/user/${id}`)

            setReservations(res.data)
        } catch (error) {
            console.log(`Erro ao carregar reservas da parko: ${error}`)
        }
    }

    const loadTabelaFixa = async (idEstacionamento) => {
        await api.get(`/tabela_fixa/${idEstacionamento}`)
            .then(res => {
                setTabelaFixa(res.data)
            })
            .catch(e => {
                console.log(`Erro ao carregar tabela fixa: ${e}`)
            })
    }

    return { 
        loadParkings, 
        loadPriceTable, 
        loadVehicles, 
        loadUsers,
        loadReservations,
        loadTabelaFixa
    }
}

export default ReadApi