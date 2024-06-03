import React, { useState, useContext } from "react";
import { 
    View, 
    Image, 
    TouchableOpacity, 
    Text 
} from 'react-native';
import { 
    Feather, 
    MaterialIcons, 
    FontAwesome, 
    Ionicons, 
    MaterialCommunityIcons 
} from 'react-native-vector-icons';
import { Dimensions } from "react-native";
import { ReservaContext } from "../../../../Context/reservaContext";
import { styles } from "./style";

function Topo({ handleImageLoaded, voltar }) {

    const { width } = Dimensions.get('screen')

    const [favoritoAtivado, setFavoritoAtivado] = useState(false)

    const { destination, distance } = useContext(ReservaContext)
    const { image, title, address, vagas, avaliacao } = destination;

    return(
        <View style={{width: "100%"}}>
            <View>
                <Image 
                    source={{ uri: image }} 
                    style={{width: width, height: 220}} 
                    onLoad={handleImageLoaded} 
                />  
            </View>
            <View 
                style={styles.botoesSuperiores}
            >
                <TouchableOpacity onPress={voltar} >
                    <Feather name="arrow-left" size={32} color="#fff" style={{padding: 30}} />
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={() => setFavoritoAtivado(!favoritoAtivado)}
                >
                    <MaterialIcons 
                        name={(favoritoAtivado ? "favorite" : "favorite-border")} 
                        size={28} 
                        color={(favoritoAtivado ? 'red' : '#fff')} 
                        style={{padding: 30}}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.infoEstacionamento}>
                <Text style={styles.nomeEstacionamento}>{title}</Text>
                <View style={styles.viewLocalEstacionamento}>
                    <MaterialCommunityIcons name="map-marker" size={14} color="#f4f4f4" />
                    <Text style={styles.localEstacionamento}>{address}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome name="arrows-h" size={16} color="#0097b9" />
                    <Text style={styles.distanciaVagaEstrela}>{distance ? distance.toFixed(1) : '-'} km</Text>

                    <Ionicons name="car" size={20} color="#0097b9" />
                    <Text style={styles.distanciaVagaEstrela}>{vagas ? vagas : 0} vagas</Text>

                    <Feather name="star" size={20} color="#0097b9" />
                    <Text style={styles.distanciaVagaEstrela}>{avaliacao ? avaliacao : 'n/a'}</Text>
                </View>
            </View>
        </View>
    )
}

export default Topo;