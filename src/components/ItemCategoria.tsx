import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { setCategoriaActual, setShowModal } from "../store/slices/customSlice";
import { useAppDispatch } from "../utils/hooks";

type props = {
    nombre: string;
};

export function ItemCategoria({nombre}: props): JSX.Element {
    const dispatch = useAppDispatch();

    function handleBuscarFotosDeCategoria(nombre: string) {
        dispatch(setCategoriaActual(nombre));
        dispatch(setShowModal(false));
      }
      
    return(
        <TouchableOpacity style={styles.contenedor} onPress={() => handleBuscarFotosDeCategoria(nombre)}>
            <Text style={styles.texto}>{nombre}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        padding: 10,
        borderBottomColor: '#00bfff',
        borderBottomWidth: 2,
    },
    texto: {
        fontSize: 22,
    },

});

function dispatch(arg0: { payload: boolean; type: "custom/setShowModal"; }) {
    throw new Error("Function not implemented.");
}
