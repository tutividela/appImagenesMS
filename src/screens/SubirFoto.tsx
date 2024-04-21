import {
  Alert,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Animated,
  PanResponder,
  GestureResponderEvent,
  PanResponderGestureState,
  Dimensions,
  Text,
} from 'react-native';
import { Boton } from '../components/Boton';
import { useEffect, useRef } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { buscarFotos, subirFoto } from '../store/slices/fotos/thunks';
import { setImagenASubir } from '../store/slices/fotos/fotosSlice';
import { StackActions } from '@react-navigation/native';
import { IndicadorCargando } from '../components/IndicadorCargando';

export function SubirFoto({ navigation, route }: any): JSX.Element {
  const { imagenASubir } = useAppSelector(state => state.fotos);
  const { cargando } = useAppSelector(state => state.custom);
  const idFamilia = route.params.idFamilia as string;
  const apellido = route.params.apellido as string;
  const dispatch = useAppDispatch();
  const panX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const { width } = Dimensions.get('screen');

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        Animated.event([null, { dx: panX }], { useNativeDriver: true });
        panX.setValue(gestureState.dx);
      },
      onPanResponderRelease: (
        e: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        if (gestureState.dx >= width / 3) {
          Alert.alert(
            'Advertencia',
            '¿Esta seguro que quiere descartar la foto a subir?',
            [
              {
                text: 'Si',
                onPress: () => {
                  panX.setValue(0);
                  dispatch(setImagenASubir(null));
                },
              },
              {
                text: 'No',
                onPress: () => {
                  Animated.timing(panX, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                  }).start();
                },
              },
            ],
          );
        } else {
          Animated.timing(panX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

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

  async function guardarFoto(): Promise<void> {
    const popAction = StackActions.pop(2);

    await dispatch(subirFoto(imagenASubir, idFamilia));
    await dispatch(buscarFotos(idFamilia));
    navigation.dispatch(popAction);
    navigation.navigate('FotosDeFamilia', { idFamilia, apellido });
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
              <Animated.Image
                source={{ uri: imagenASubir.uri }}
                style={{
                  ...styles.foto,
                  opacity: opacity,
                  transform: [{ translateX: panX }],
                }}
                {...panResponder.panHandlers}
              />
            ) : (
              <Image
                source={require('../public/fotoVacia.jpg')}
                style={{
                  ...styles.foto,
                }}
              />
            )}
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
                  },
                  {
                    text: 'Si',
                    onPress: async () => await guardarFoto(),
                  },
                ]);
              }}
              style={styles.botonSubirFoto}
              deshabilitar={!imagenASubir ? true : false}
            />
          </View>
        </>
      ) : (
        <View style={styles.contenedorCargando}>
          <IndicadorCargando
            color="#00bfff"
            tamanioIcono={50}
            cargando={cargando}
          >
            <Text style={{ fontSize: 18 }}>Subiendo la foto...</Text>
            <Text style={{ fontSize: 18 }}>Este proceso puede demorar</Text>
            <Text style={{ fontSize: 18 }}>Por favor espere...</Text>
          </IndicadorCargando>
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
    alignItems: 'center',
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
