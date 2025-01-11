import { createContext, useContext, useState } from 'react'

const DataUserContext = createContext({})

export function DataUserProvider({ children }) {

    const [dataUser, setDataUser] = useState({})
    const [estacionamentos, setEstacionamentos] = useState([])
    const [priceTable, setPriceTable] = useState({})
    const [veiculos, setVeiculos] = useState([])
    const [users, setUsers] = useState([])
    const [favorites, setFavorites] = useState([])
    const [faq, setFaq] = useState([])
    
    const value = {
        dataUser, 
        setDataUser,
        estacionamentos,
        setEstacionamentos,
        priceTable,
        setPriceTable,
        veiculos,
        setVeiculos,
        users,
        setUsers,
        favorites, 
        setFavorites,
        faq, 
        setFaq
    }

    return (
        <DataUserContext.Provider value={value}>
            {children}
        </DataUserContext.Provider>
    )
}

export const useUser = () => useContext(DataUserContext)