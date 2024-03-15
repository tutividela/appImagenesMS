import {faCirclePlus, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Foto} from '../components/Foto';
import {Boton} from '../components/Boton';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {setShowModal} from '../store/slices/customSlice';
import {ModalCategorias} from '../components/ModalCategorias';

export function FotosDeFamilia({navigation, route}: any): JSX.Element {
  const {idFamilia, apellido} = route.params;
  const {categoriaActual} = useAppSelector(state => state.custom);
  const dispatch = useAppDispatch();

  function handleShowModal() {
    dispatch(setShowModal(true));
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>{apellido}</Text>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faCirclePlus} color="#00bfff" size={30} />
        </TouchableOpacity>
      </View>
      <ModalCategorias />
      <View style={styles.contenedorSelector}>
        <Boton
          titulo={categoriaActual}
          onPress={() => handleShowModal()}
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
