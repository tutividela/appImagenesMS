import {
  faDownload,
  faLocationDot,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Animated } from 'react-native';
import { Imagen } from '../types/types';
import { useState } from 'react';
import { IndicadorCargando } from './IndicadorCargando';

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
  const [cargandoFoto, setCargandoFoto] = useState<boolean>(true);

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
    <Animated.View
      style={{
        ...styles.contenedor,
        opacity: opacity,
        transform: [{ scale: scale }],
      }}
    >
      <View style={styles.contenedorImagen}>
        <IndicadorCargando
          color="#00bfff"
          tamanioIcono={32}
          cargando={cargandoFoto}
        >
          <Text>Cargando la foto...</Text>
          <Text>Por favor espere...</Text>
        </IndicadorCargando>
        <Animated.Image
          source={{
            uri: url,
          }}
          style={{
            height: 300,
            width: 300,
          }}
          onLoadEnd={() => setCargandoFoto(false)}
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
