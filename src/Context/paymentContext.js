import React, { createContext, useContext, useState } from "react"

export const PaymentContext = createContext({})

export function PaymentProvider({ children }) {
    const [card, setCard] = useState([])
    const [cartaoSelecionado, setCartaoSelecionado] = useState(null)
    const [cardData, setCardData] = useState({
        name: "",
        card_number: "",
        date_time: "",
        cvc: "",
        cpf: ""
    })
    const [tokenCard, setTokenCard] = useState("")

    const value = {
        card, 
        setCard,
        cartaoSelecionado, 
        setCartaoSelecionado,
        cardData, 
        setCardData,
        tokenCard, 
        setTokenCard
    }

    return (
        <PaymentContext.Provider value={value}>
            {children}
        </PaymentContext.Provider>
    )
}

export const usePayment = () => useContext(PaymentContext)