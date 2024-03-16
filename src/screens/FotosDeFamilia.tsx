import {faCirclePlus, faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Foto} from '../components/Foto';
import {Boton} from '../components/Boton';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {setShowModal} from '../store/slices/custom/customSlice';
import {ModalCategorias} from '../components/ModalCategorias';
import {useEffect} from 'react';
import {buscarFotos} from '../store/slices/fotos/thunks';

export function FotosDeFamilia({navigation, route}: any): JSX.Element {
  const {idFamilia, apellido} = route.params;
  const {categoriaActual, cargando} = useAppSelector(state => state.custom);
  const {imagenes} = useAppSelector(state => state.fotos);
  const dispatch = useAppDispatch();
  const urlImagenes: string = `https://backend-appsmoviles.onrender.com/images/${idFamilia}/`;

  function handleShowModal() {
    dispatch(setShowModal(true));
  }

  useEffect(() => {
    dispatch(buscarFotos(idFamilia, categoriaActual));
  }, []);

  useEffect(() => {
    dispatch(buscarFotos(idFamilia, categoriaActual));
  }, [categoriaActual]);

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
        {cargando ? (
          <ActivityIndicator color="#00bfff" size={50} />
        ) : imagenes.length? (
          <FlatList
            data={imagenes}
            renderItem={({item}) => (
              <Foto url={`${urlImagenes}${item.imageName}`} />
            )}
          />
        ) : (
          <View style={styles.contenedorNoHayFotos}>
            <Text style={styles.tituloNoHayFotos}>No hay fotos</Text>
          </View>
        )}
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
    flexDirection: 'column',
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
  contenedorNoHayFotos: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tituloNoHayFotos: {
    fontSize: 20,
  },
});
