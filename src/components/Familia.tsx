import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Encuesta } from '../types/types';
import React, { useRef, useState } from 'react';
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
  const [altura, setAltura] = useState(0);
  const { partido, provincia, barrio } = familia.encuestaUno.direccion;
  const inputRange = [-1, 0, altura * index, altura * (index + 1)];

  const opacity = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.4],
  });
  const scale = scrollY.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.9],
  });

  return (
    <Animated.View
      style={{ ...styles.container, opacity: opacity, transform: [{scale: scale}] }}
      onLayout={(event: LayoutChangeEvent) =>
        setAltura(event.nativeEvent.layout.height)
      }
    >
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
