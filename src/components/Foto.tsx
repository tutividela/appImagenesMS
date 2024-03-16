import {
  faDownload,
  faLocationDot,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Image, StyleSheet, View} from 'react-native';

type props = {
  url: string;
};

export function Foto({url}: props): JSX.Element {
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorImagen}>
        <Image
          source={require('../public/logo-modulo.png')}
          style={styles.imagen}
        />
      </View>
      <View style={styles.contenedorIconos}>
        <FontAwesomeIcon icon={faTrash} size={30} color="#b22222" />
        <FontAwesomeIcon icon={faLocationDot} size={30} color="#1e90ff" />
        <FontAwesomeIcon icon={faDownload} size={30} color="#808080" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
  },
  contenedorImagen: {
    flex: 1,
  },
  imagen: {
    height: '100%',
    width: '100%',
    resizeMode: 'repeat'
  },
  contenedorIconos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
