import {
  faDownload,
  faLocationDot,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useRef } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Animated } from 'react-native';

type props = {
  id: string;
  url: string;
  onhandleUbicacionEnMapa: Function;
  onHandleEliminarFoto: Function;
  latitud: number | null;
  longitud: number | null;
};

export function Foto({
  id,
  url,
  onhandleUbicacionEnMapa,
  onHandleEliminarFoto,
  latitud,
  longitud,
}: props): JSX.Element {
  const dimensionValueAnimation = useRef(new Animated.Value(0)).current;
  const opacityValueAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel(
      [
        Animated.timing(dimensionValueAnimation, {
          toValue: 300,
          duration: 700,
          useNativeDriver: false,
        }),

        Animated.timing(opacityValueAnimation, {
          toValue: 1,
          duration: 500,
          delay: 500,
          useNativeDriver: false,
        }),
      ],
      {
        stopTogether: false,
      },
    ).start();
  }, [dimensionValueAnimation]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorImagen}>
        <Animated.Image
          source={{
            uri: url,
          }}
          style={{
            height: dimensionValueAnimation,
            width: dimensionValueAnimation,
          }}
        />
      </View>
      <Animated.View
        style={{ ...styles.contenedorIconos, opacity: opacityValueAnimation }}
      >
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Atencion', '¿Esta seguro de eliminar la foto?', [
              {
                text: 'No',
                onPress: () => console.log('No se elimino la foto'),
              },
              {
                text: 'Si',
                onPress: () => onHandleEliminarFoto(id),
              },
            ])
          }
        >
          <FontAwesomeIcon icon={faTrash} size={30} color="#b22222" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onhandleUbicacionEnMapa(latitud, longitud)}
        >
          <FontAwesomeIcon icon={faLocationDot} size={30} color="#1e90ff" />
        </TouchableOpacity>
        <FontAwesomeIcon icon={faDownload} size={30} color="#808080" />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  contenedorImagen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contenedorIconos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
