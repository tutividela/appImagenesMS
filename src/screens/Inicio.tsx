import {Alert, Button, Image, StyleSheet, Text, View} from 'react-native';
import {Boton} from '../components/Boton';
import {faFilter, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {faGoogle} from '@fortawesome/free-brands-svg-icons';

export function Inicio({navigation}: any): JSX.Element {
  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorImagen}>
        <Image
          source={require('../public/logo-modulo.png')}
          style={styles.imagen}
        />
      </View>
      <Boton
        onPress={() => navigation.navigate('Encuestas')}
        style={styles.boton}
        titulo="Iniciar Sesion"
        nombreDeIcono={faGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 10,
  },
  contenedorImagen: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  imagen: {
    resizeMode: 'center',
  },
  boton: {
    flexDirection: 'column',
    alignSelf: 'center',
    width: '50%',
    backgroundColor: '#00bfff',
    borderRadius: 5,
  },
});
