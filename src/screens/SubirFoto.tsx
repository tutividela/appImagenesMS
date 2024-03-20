import { Alert, StyleSheet, View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Boton } from '../components/Boton';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCancel, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export function SubirFoto(): JSX.Element {
  const [uriFoto, setUriFoto] = useState('');

  async function handleSubirFoto(): Promise<void> {
    try {
      const { assets } = await launchImageLibrary({
        mediaType: 'photo',
        includeExtra: true,
        presentationStyle: 'overFullScreen',
      });
      console.log(assets);
      assets?.[0].uri
        ? setUriFoto(assets[0].uri)
        : Alert.alert('Error', 'Uri no dispoible');
    } catch (error: any) {
      console.log('Error en launchImageLibrary: ', error);
      Alert.alert('Error', 'Hubo un error al abrir la galeria');
    }
  }
  return (
    <View style={styles.contendor}>
      <View style={styles.contenedorFoto}>
        {uriFoto !== '' ? (
          <Image
            source={{ uri: uriFoto }}
            style={styles.foto}
          />
        ) : null}
        <FontAwesomeIcon icon={faCircleXmark} size={50}/>
      </View>
      <View style={styles.contenedorBotones}>
        <Boton
          titulo="Elegir foto de galeria"
          onPress={() => handleSubirFoto()}
          style={styles.botonAbrirGaleria}
        />
        <Boton
          titulo="Subir Foto"
          onPress={() => console.log('Aca tengo que subir la foto')}
          style={styles.botonSubirFoto}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contendor: {
    flex: 1,
    flexDirection: 'column',
  },
  contenedorFoto: {
    flex: 4,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contenedorBotones: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  foto: {
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
