import React, { useContext, useEffect, useState } from "react"
import { 
    Text, 
    View, 
    FlatList
} from "react-native"
import { styles } from "./style"
import ReadApi from "../../Services/readData"
import { ReservaContext } from "../../Context/reservaContext"
import { useUser } from "../../Context/dataUserContext"
import { emptyReservation } from "../../Mocks/emptyList"
import LoadingModal from "../../Components/Loading"
import TopArrowLeft from "../../Components/TopArrowLeft"
import ReservationsList from "./components/reservationsList"

export default function Reservations() {

    const { loadReservations } = ReadApi()
    const { dataUser } = useUser()
    const { reservations } = useContext(ReservaContext)

    const [loading, setLoading] = useState(false)
    
    const userReservations = reservations.filter(item => item.id_costumer == dataUser.id)

    const EmptyListMessage = () => {
        return (
            <View>
                <Text style={styles.reservaVazio}>{emptyReservation}</Text>
            </View>
        )
    }

    useEffect(() => {
        loadReservations()
    }, [])

    return (
        <View style={styles.areaContent}>
            <TopArrowLeft children={"Reservas"} />
            <FlatList 
                style={{ marginTop: 36, marginHorizontal: 40 }}
                data={userReservations}
                renderItem={item => (
                    <ReservationsList 
                        {...item} 
                        setLoading={setLoading} 
                        userReservations={userReservations}
                    />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                showsVerticalScrollIndicator={false}
            />
            <LoadingModal loading={loading} /> 
        </View>
    )
}