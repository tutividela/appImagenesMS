import {StyleSheet, Text, View} from 'react-native';
import {Encuesta} from '../types/types';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

type props = {
  familia: Encuesta;
};

export function Familia({familia}: props): React.JSX.Element {
  const {partido, provincia, barrio} = familia.encuestaUno.direccion;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.campo}>
          Familia: <Text style={styles.valor}>{familia.apellido}</Text>
        </Text>
        <Text style={styles.campo}>
          Estado: <Text style={styles.valor}>{familia.estado}</Text>
        </Text>
        <Text style={styles.campo}>
          Provincia: <Text style={styles.valor}>{provincia}</Text>
        </Text>
        <Text style={styles.campo}>
          Partido: <Text style={styles.valor}>{partido}</Text>
        </Text>
        <Text style={styles.campo}>
          Barrio: <Text style={styles.valor}>{barrio}</Text>
        </Text>
      </View>
      <View>
        <FontAwesomeIcon icon={faArrowRight} color="#00bfff" size={32} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomColor: '#00bfff',
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  campo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  valor: {
    fontSize: 20,
    fontWeight: 'normal',
  },
});
