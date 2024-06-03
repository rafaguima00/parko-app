import { createContext, useState } from 'react'

export const ReservaContext = createContext({});

export function ReservaProvider({ children }) {

    const [distance, setDistance] = useState(null)
    const [destination, setDestination] = useState(null)
    const [veiculoEscolhido, setVeiculoEscolhido] = useState({})
    const [reservaFeita, setReservaFeita] = useState(false)
    const [tempoTotal, setTempoTotal] = useState(0)
    const [running, setRunning] = useState(false)

    const value = {
        distance, 
        setDistance, 
        destination, 
        setDestination,
        veiculoEscolhido,
        setVeiculoEscolhido,
        reservaFeita,
        setReservaFeita,
        tempoTotal,
        setTempoTotal,
        running,
        setRunning
    }

    return (
        <ReservaContext.Provider value={value}>
            {children}
        </ReservaContext.Provider>
    )
}