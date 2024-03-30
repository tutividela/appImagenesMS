import {
  faDownload,
  faLocationDot,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useEffect, useRef } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Animated } from 'react-native';
import { Imagen } from '../types/types';

type props = {
  index: number;
  scrollX: Animated.Value;
  imagen: Imagen;
  url: string;
  onhandleUbicacionEnMapa: Function;
  onHandleEliminarFoto: Function;
  onHandleDescargarFoto: Function;
};

export function Foto({
  index,
  scrollX,
  imagen,
  url,
  onhandleUbicacionEnMapa,
  onHandleEliminarFoto,
  onHandleDescargarFoto,
}: props): JSX.Element {
  const { _id, imageName, latitude, longitude } = imagen;
  const { width } = Dimensions.get('screen');

  const inputRange = [-1, 0, width * index, width * (index + 1)];
  const opacity = scrollX.interpolate({
    inputRange: inputRange,
    outputRange: [1, 1, 1, 0],
  });
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1, 1, 1, 0.6],
  });

  return (
    <Animated.View style={{ ...styles.contenedor, opacity: opacity, transform:[{scale: scale}] }}>
      <View style={styles.contenedorImagen}>
        <Animated.Image
          source={{
            uri: url,
          }}
          style={{
            height: 300,
            width: 300,
          }}
        />
      </View>
      <Animated.View style={{ ...styles.contenedorIconos }}>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Atencion', '¿Esta seguro de eliminar la foto?', [
              {
                text: 'No',
                onPress: () => console.log('No se elimino la foto'),
              },
              {
                text: 'Si',
                onPress: async () => await onHandleEliminarFoto(_id),
              },
            ])
          }
        >
          <FontAwesomeIcon icon={faTrash} size={30} color="#b22222" />
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onhandleUbicacionEnMapa(latitude, longitude)}
          >
            <FontAwesomeIcon icon={faLocationDot} size={30} color="#1e90ff" />
          </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => await onHandleDescargarFoto(imageName, url)}
        >
          <FontAwesomeIcon icon={faDownload} size={30} color="#808080" />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
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
