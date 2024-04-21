import { Alert, PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export async function obtenerPermisos(
  nombre: string,
  urlFoto: string,
): Promise<void> {
  if (Platform.OS === 'ios') {
    descargar(nombre, urlFoto);
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        descargar(nombre, urlFoto);
      } else {
        console.log('please grant permission');
      }
    } catch (err: any) {
      console.log('Error en obtenerPermisos: ', err);
    }
  }
}

function descargar(nombreConExtension: string, urlFoto: string): void {
  const { dirs } = RNFetchBlob.fs;
  const dirToSave = Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
  const configfb = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: `${nombreConExtension}`,
      path: `${dirs.DownloadDir}/${nombreConExtension}`,
    },
    useDownloadManager: true,
    notification: true,
    mediaScannable: true,
    title: `${nombreConExtension}`,
    path: `${dirToSave}/${nombreConExtension}`,
  };
  const configOptions = Platform.select({
    ios: configfb,
    android: configfb,
  });

  RNFetchBlob.config(configOptions || {})
    .fetch('GET', urlFoto, {})
    .then(res => {
      if (Platform.OS === 'ios') {
        RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(configfb.path);
      }
      if (Platform.OS === 'android') {
        Alert.alert('Exito', 'La imagen se ha descargado');
      }
    })
    .catch(error => {
      console.log('Error en RNFetchblog.config: ', error);
    });
}
