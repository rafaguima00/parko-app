import ReservasConcluidas from "./reservasConcluidas"
import ReservasAgendadas from "./reservasAgendadas"
import ReservaEmAndamento from "./reservaEmAndamento"
import { View } from "react-native"
import { EstadoReserva, ViewAllReservations } from "../style"

const ReservationsList = ({ item, setLoading, userReservations }) => {

    return <>
        <ViewAllReservations>
            {(item.status == "Confirmado" || item.status == "Recusado") &&
                <ReservaEmAndamento item={item} />
            }
            {item.status == "Pendente" &&
                <ReservasAgendadas item={item} />
            }
            {item.status == "Finalizado" &&
                <ReservasConcluidas 
                    item={item} 
                    userReservations={userReservations}
                    setLoading={setLoading}
                />
            }
            {item.status == "Cancelado" &&
                <View>{}</View>
            }
        </ViewAllReservations>
    </>
}

export default ReservationsList