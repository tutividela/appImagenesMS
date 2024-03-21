import { faCirclePlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Foto } from '../components/Foto';
import { Boton } from '../components/Boton';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setCargando, setShowModal } from '../store/slices/custom/customSlice';
import { ModalCategorias } from '../components/ModalCategorias';
import { useEffect } from 'react';
import { buscarFotos, eliminarFoto } from '../store/slices/fotos/thunks';
import { obtenerPermisos } from '../utils/descargarFoto';

export function FotosDeFamilia({ navigation, route }: any): JSX.Element {
  const { idFamilia, apellido } = route.params;
  const { categoriaActual, cargando } = useAppSelector(state => state.custom);
  const { imagenes } = useAppSelector(state => state.fotos);
  const dispatch = useAppDispatch();
  const urlImagenes: string = `https://backend-appsmoviles.onrender.com/images/${idFamilia}/`;

  function handleShowModal() {
    dispatch(setShowModal(true));
  }

  function handleUbicacionEnMapa(
    latitud: number | null,
    longitud: number | null,
  ): void {
    const noExisteUbicacion = latitud === null || longitud === null;
    if (noExisteUbicacion) {
      Alert.alert(
        'Advertencia',
        'La Foto no tiene ubicacion para mostrar en el mapa',
      );
    } else {
      navigation.navigate('Mapa', { latitud: latitud, longitud: longitud });
    }
  }

  function handleEliminarFoto(id: string): void {
    dispatch(eliminarFoto(idFamilia, categoriaActual, id));
    dispatch(buscarFotos(idFamilia, categoriaActual));
  }

  async function handleDescargarFoto(
    nombreConExtension: string,
    urlFoto: string,
  ): Promise<void> {
    dispatch(setCargando(true));
    await obtenerPermisos(nombreConExtension, urlFoto);
    dispatch(setCargando(false));
  }

  function handleSubirFoto(): void {
    navigation.navigate('SubirFoto', { idFamilia: idFamilia });
  }

  useEffect(() => {
    dispatch(buscarFotos(idFamilia, categoriaActual));
  }, [categoriaActual]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>{apellido}</Text>
        <TouchableOpacity onPress={() => handleSubirFoto()}>
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
        ) : imagenes.length ? (
          <FlatList
            data={imagenes}
            renderItem={({ item }) => (
              <Foto
                imagen={item}
                url={`${urlImagenes}${item.imageName}`}
                onhandleUbicacionEnMapa={handleUbicacionEnMapa}
                onHandleEliminarFoto={handleEliminarFoto}
                onHandleDescargarFoto={handleDescargarFoto}
              />
            )}
            horizontal={true}
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tituloNoHayFotos: {
    fontSize: 20,
  },
});
