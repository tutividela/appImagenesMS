import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Encuesta } from '../types/types';
import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type props = {
  index: number;
  scrollY: Animated.Value;
  familia: Encuesta;
  handleMagnify: Function;
};
const { height } = Dimensions.get('screen');

export function Familia({
  index,
  scrollY,
  familia,
  handleMagnify,
}: props): React.JSX.Element {
  const { partido, provincia, barrio } = familia.encuestaUno.direccion;
  const inputRange = [
    -1,
    0,
    (height * 0.1 + 15) * index,
    (height * 0.1 + 15) * (index + 3),
  ];
  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0],
  });
  

  return (
    <Animated.View style={{ ...styles.container, opacity: opacity}}>
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
      <TouchableOpacity
        onPress={() => handleMagnify(familia._id, familia.apellido)}
      >
        <FontAwesomeIcon icon={faArrowRight} color="#00bfff" size={32} />
      </TouchableOpacity>
    </Animated.View>
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
