import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type props = {
  titulo: string;
  handleOnChangeText: Function;
};

export function FiltroEncuesta({
  titulo,
  handleOnChangeText,
}: props): React.JSX.Element {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>{titulo}</Text>
      <TextInput
        style={styles.filtro}
        clearTextOnFocus={true}
        onChangeText={(text: string) => handleOnChangeText(text)}
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
