import { Alert, Image, StyleSheet, View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { storage } from '../utils/mmkv';
import { useContext } from 'react';
import { Context } from '../utils/context';

GoogleSignin.configure({
  webClientId:
    '612735597766-0qp95uj4g2iker36m7uskju41oti3sre.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

export function Inicio(): JSX.Element {
  const { setEstaLogueado } = useContext(Context);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        user: { name, photo },
        idToken,
      } = await GoogleSignin.signIn();

      storage.set('idtoken', idToken!);
      storage.set('usuario', name!);
      storage.set('urlFoto', photo!);
      console.log(idToken);
      setEstaLogueado(true);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play services not available');
      } else {
        Alert.alert(error.code);
        console.log(error.message);
        console.log(error.code);
      }
    }
  };

  return (
    <View style={styles.contenedor}>
      <View style={styles.contenedorImagen}>
        <Image
          source={require('../public/logo-modulo.png')}
          style={styles.imagen}
        />
      </View>
      <GoogleSigninButton
        style={styles.boton}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
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
    borderRadius: 5,
  },
});
