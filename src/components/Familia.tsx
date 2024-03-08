import {StyleSheet, Text, View} from 'react-native';
import {Encuesta} from '../types/types';
import React from 'react';

type props = {
  familia: Encuesta;
};

export function Familia({familia}: props): React.JSX.Element {
  //const {partido, provincia, barrio} = familia.encuestaUno.direccionUno;

  return (
    <View style={styles.container}>
      <Text>Familia: {familia.apellido}</Text>
      <Text>{familia.estado}</Text>
      {/* <Text>Provincia: {familia.encuestaUno.direccionUno.provincia}</Text>
      <Text>Partido: {familia.encuestaUno.direccionUno.partido}</Text>
      <Text>Barrio: {familia.encuestaUno.direccionUno.barrio}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: 'blue',
    borderBottomWidth: 2
  },
});
