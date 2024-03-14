import {faCirclePlus, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {faAdd} from '@fortawesome/free-solid-svg-icons/faAdd';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Foto} from '../components/Foto';
import {Boton} from '../components/Boton';

export function FotosDeFamilia(): JSX.Element {
  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Familia: </Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faCirclePlus} color="#00bfff" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.contenedorSelector}>
        <Boton
          titulo="Categoria"
          onPress={() => console.log('tengo que desplegar el modal')}
          style={styles.selector}
          nombreDeIcono={faCaretDown}
        />
      </View>
      <View style={styles.cuerpo}>
        <Foto />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    margin: 10,
  },
  cabecera: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#c0c0c0',
  },
  titulo: {
    fontSize: 35,
  },
  cuerpo: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contenedorSelector: {
    padding: 10,
    paddingHorizontal: 30,
  },
  selector: {
    backgroundColor: '#00bfff',
    borderRadius: 5,
  },
});
