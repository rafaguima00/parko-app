import { createContext, useState } from 'react'

export const ReservaContext = createContext({})

export function ReservaProvider({ children }) {

    const [distance, setDistance] = useState(null)
    const [destination, setDestination] = useState(null)
    const [reservaFeita, setReservaFeita] = useState(false)
    const [reservations, setReservations] = useState([])
    const [vagaReservada, setVagaReservada] = useState({})
    const [novaReserva, setNovaReserva] = useState(null)
    const [personalizado, setPersonalizado] = useState(false)
    const [tabelaFixa, setTabelaFixa] = useState([])
    const [priceTable, setPriceTable] = useState({})
    const [horaFuncionamento, setHoraFuncionamento] = useState([])
    const [itemPreSelecionado, setItemPreSelecionado] = useState({})
    const [valorPreSelecionado, setValorPreSelecionado] = useState(null)
    const [distanceMatrix, setDistanceMatrix] = useState([])
    const [tipoReserva, setTipoReserva] = useState("")
    const [code, setCode] = useState([])
    const [expiresAt, setExpiresAt] = useState("")

    const value = {
        distance, 
        setDistance, 
        destination, 
        setDestination,
        reservaFeita,
        setReservaFeita,
        vagaReservada,
        setVagaReservada,
        novaReserva, 
        setNovaReserva,
        reservations,
        setReservations,
        personalizado,
        setPersonalizado,
        tabelaFixa,
        setTabelaFixa,
        priceTable, 
        setPriceTable,
        horaFuncionamento, 
        setHoraFuncionamento,
        itemPreSelecionado, 
        setItemPreSelecionado,
        valorPreSelecionado, 
        setValorPreSelecionado,
        distanceMatrix, 
        setDistanceMatrix,
        tipoReserva, 
        setTipoReserva,
        code, 
        setCode,
        expiresAt,
        setExpiresAt
    }

    return (
        <ReservaContext.Provider value={value}>
            {children}
        </ReservaContext.Provider>
    )
}