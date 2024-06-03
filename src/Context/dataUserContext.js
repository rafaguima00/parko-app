import { createContext, useState } from 'react'

export const DataUserContext = createContext({});

export function DataUserProvider({ children }) {

    const [dados, setDados] = useState({
        nome: '',
        sobrenome: '',
        numero: '',
        cpf: '',
        email: '',
        password: ''
    })

    const value = {
        dados, 
        setDados
    };

    return (
        <DataUserContext.Provider value={value}>
            {children}
        </DataUserContext.Provider>
    )
}