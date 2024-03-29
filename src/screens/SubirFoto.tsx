import {
  Alert,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import { Boton } from '../components/Boton';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import ImagePicker from 'react-native-image-crop-picker';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { buscarFotos, subirFoto } from '../store/slices/fotos/thunks';
import { setImagenASubir } from '../store/slices/fotos/fotosSlice';
import { StackActions } from '@react-navigation/native';

export function SubirFoto({ navigation, route }: any): JSX.Element {
  const { imagenASubir } = useAppSelector(state => state.fotos);
  const { categoriaActual } = useAppSelector(state => state.custom);
  const { cargando } = useAppSelector(state => state.custom);
  const idFamilia = route.params.idFamilia as string;
  const apellido = route.params.apellido as string;
  const dispatch = useAppDispatch();

  function agregarFotoDeGaleria(): void {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      includeExif: true,
    }).then(image => {
      dispatch(
        setImagenASubir({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          exif: image.exif,
        }),
      );
    });
  }

  function guardarFoto(): void {
    const popAction = StackActions.pop(2);
    
    dispatch(subirFoto(imagenASubir, idFamilia, categoriaActual));
    dispatch(buscarFotos(idFamilia, categoriaActual));
    navigation.dispatch(popAction);
    //navigation.navigate('FotosDeFamilia', {idFamilia: idFamilia, apellido: apellido});
  }

  useEffect(() => {
    dispatch(setImagenASubir(null));
  }, []);

  return (
    <View style={styles.contendor}>
      {!cargando ? (
        <>
          <View style={styles.contenedorFoto}>
            {imagenASubir ? (
              <Image source={{ uri: imagenASubir.uri }} style={styles.foto} />
            ) : (
              <Image
                source={require('../public/fotoVacia.jpg')}
                style={styles.foto}
              />
            )}
            <FontAwesomeIcon icon={faCircleXmark} size={50} />
          </View>
          <View style={styles.contenedorBotones}>
            <Boton
              titulo="Elegir foto de galeria"
              onPress={() => agregarFotoDeGaleria()}
              style={styles.botonAbrirGaleria}
            />
            <Boton
              titulo="Subir Foto"
              onPress={() => {
                Alert.alert('Advertencia', '¿Esta seguro de guardar la foto?', [
                  {
                    text: 'No',
                    onPress: () => console.log('No se elimino la foto'),
                  },
                  {
                    text: 'Si',
                    onPress: () => guardarFoto(),
                  },
                ]);
              }}
              style={styles.botonSubirFoto}
            />
          </View>
        </>
      ) : (
        <View style={styles.contenedorCargando}>
          <ActivityIndicator color="#00bfff" size={50} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contendor: {
    flex: 1,
    flexDirection: 'column',
  },
  contenedorCargando: {
    flex: 1,
    justifyContent: 'center',
  },
  contenedorFoto: {
    flex: 4,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contenedorBotones: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  foto: {
    height: 300,
    width: 300,
  },
  botonSubirFoto: {
    backgroundColor: '#00bfff',
    borderRadius: 5,
  },
  botonAbrirGaleria: {
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
  },
});
