import ReservasConcluidas from "./reservasConcluidas"
import ReservasAgendadas from "./reservasAgendadas"
import ReservaEmAndamento from "./reservaEmAndamento"

const ReservationsList = ({ item, setLoading, userReservations }) => {

    return <>
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
    </>
}

export default ReservationsList