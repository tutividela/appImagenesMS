import { StyleSheet, Text, TextInput, View } from "react-native";

type props = {
    titulo: string;
}

export function FiltroEncuesta({titulo,}: props): JSX.Element {
    return(
        <View style={styles.contenedor}>
            <Text style={styles.titulo}>{titulo}</Text>
            <TextInput
                style={styles.filtro}
                clearTextOnFocus={true}
                inputMode="text"
                keyboardType="default"
                placeholder="Escriba aqui..."
            />
        </View>
    );
}

const styles = StyleSheet.create({
    contenedor: {
        margin: 10,
    },
    titulo: {
        fontSize: 20,
    },
    filtro: {
        fontSize: 18,
        borderWidth: 1.5,
        borderColor: '#00bfff',
        borderRadius: 5,
    },
});