import { Alert } from "react-native"
import { useUser } from "../Context/dataUserContext"
import { useReservation } from "../Context/reservaContext"
import { GEOCODING_API_KEY, GOOGLE_PLACES_API_KEY } from "@env"
import axios from "axios"
import api from "../Services/api"
import { useEffect, useState } from "react"
import Alerta from "../Components/SnackBar"

const useParkings = () => {
    
    const { setPriceTable } = useReservation()
    const { location, setEstacionamentos, setLocation, setModalPesquisar } = useUser()

    const [radius, setRadius] = useState(0)
    const [error, setError] = useState(false)

    async function geoCodingApi(text, clickedRef, setLoading) {

        if (clickedRef.current === true) return 

        if (!text) return

        clickedRef.current = true

        setLoading(true)

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(text)}&key=${GEOCODING_API_KEY}`
            )
            
            const data = response.data

            const LOCATION_TYPE = {
                "ROOFTOP": 0.5,
                "RANGE_INTERPOLATED": 0.5,
                "GEOMETRIC_CENTER": 0.8,
                "APPROXIMATE": 1
            }

            if (data.status === "ZERO_RESULTS") {
                setError(true)
                return (
                    <Alerta 
                        error={error} 
                        setError={setError} 
                        message={"Nenhum resultado encontrado."} 
                    />
                )
            }

            if (data.status === "OK") {

                setLocation(location => ({
                    ...location, 
                    latitude: data.results[0].geometry.location.lat,
                    longitude: data.results[0].geometry.location.lng
                }))
                setRadius(LOCATION_TYPE[data.results[0].geometry.location_type])

                return
            }

            setError(true)
            return <Alerta 
                error={error} 
                setError={setError} 
                message={"Erro ao buscar localização"} 
            />

        } catch (error) {
            console.error("Erro:", error)
        } finally {
            setLoading(false)
            clickedRef.current = false
        }
    }

    async function autocompletePlaces(address, setSuggestions) {

        if (address === "") {
            setSuggestions([])

            return
        }

        try {
            const response = await axios.post(
                "https://places.googleapis.com/v1/places:autocomplete",
                {
                    input: address,
                    regionCode: "br"
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY
                    }
                }
            )

            const data = response.data

            const mapData = data.suggestions?.map(item => ({
                id: item.placePrediction.placeId,
                mainText: item.placePrediction.structuredFormat.mainText.text,
                secondaryText: item.placePrediction.structuredFormat.secondaryText.text
            }))

            setSuggestions(mapData)
        } catch (error) {
            console.error("Erro:", error)
        }
    }

    async function loadParkings(location, radius) {

        try {
            const res = await api.get("/search-establishments", {
                params: {
                    user_lat: location?.latitude,
                    user_long: location?.longitude,
                    radius
                }
            })

            const estacionamentosComPreco = await Promise.all(
                res.data.map(async (item) => {
                    try {
                        const res = await api.get(`/tabela_preco/${item.id}`)
                        const tabela = res.data

                        if (item.type_of_charge === "hora_fracao") {
                            setPriceTable(tabela)

                            return {
                                ...item,
                                valor_hora: tabela[0].valor_hora,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }

                        if (item.type_of_charge === "tabela_fixa") {
                            const response = await api.get(`/tabela_fixa/${item.id}`)
                            const tabelaFixa = response.data
                            setPriceTable(tabelaFixa)

                            return {
                                ...item,
                                valor_hora: tabelaFixa[0].value,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }
                        
                        return item
                    } catch (error) {
                        console.error(error)
                        return item 
                    }
                })
            )

            if (estacionamentosComPreco.length === 0) {
                setError(true)
                return (
                    <Alerta 
                        error={error} 
                        setError={setError} 
                        message={"Ainda não há estacionamento Parko próximo ao local desejado."} 
                    />
                )
            }

            setEstacionamentos(estacionamentosComPreco.filter(Boolean))

        } catch (error) {
            Alert.alert("Erro ao carregar estacionamentos", String(error))
        }
    }

    useEffect(() => {
        if (radius > 0 && location) {
            setModalPesquisar(false)
            loadParkings(location, radius)
        }
    }, [location, radius])

    return { autocompletePlaces, geoCodingApi, loadParkings }
}

export default useParkings