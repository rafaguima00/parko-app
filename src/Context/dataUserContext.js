import { createContext, useContext, useState } from 'react'

const DataUserContext = createContext({});

export function DataUserProvider({ children }) {

    const [dataUser, setDataUser] = useState({})
    const [estacionamentos, setEstacionamentos] = useState([])
    const [priceTable, setPriceTable] = useState({})
    const [veiculos, setVeiculos] = useState([])
    const [users, setUsers] = useState([])
    
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
        setUsers
    }

    return (
        <DataUserContext.Provider value={value}>
            {children}
        </DataUserContext.Provider>
    )
}

export const useUser = () => useContext(DataUserContext)