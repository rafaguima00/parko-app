import { createContext, useContext, useState } from 'react'
import { latitudeDelta, longitudeDelta } from '../Mocks/location'

const DataUserContext = createContext({})

export function DataUserProvider({ children }) {

    const [dataUser, setDataUser] = useState({})
    const [estacionamentos, setEstacionamentos] = useState([])
    const [priceTable, setPriceTable] = useState({})
    const [veiculos, setVeiculos] = useState([])
    const [users, setUsers] = useState([])
    const [favorites, setFavorites] = useState([])
    const [faq, setFaq] = useState([])
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    })
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    })
    const [modalPesquisar, setModalPesquisar] = useState(false)
    
    const value = {
        dataUser, setDataUser,
        estacionamentos, setEstacionamentos,
        priceTable, setPriceTable,
        veiculos, setVeiculos,
        users, setUsers,
        favorites, setFavorites,
        faq, setFaq,
        location, setLocation,
        userLocation, setUserLocation,
        modalPesquisar, setModalPesquisar
    }

    return (
        <DataUserContext.Provider value={value}>
            {children}
        </DataUserContext.Provider>
    )
}

export const useUser = () => useContext(DataUserContext)