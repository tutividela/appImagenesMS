import {Image, StyleSheet, View} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: '612735597766-0qp95uj4g2iker36m7uskju41oti3sre.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
})

export function Inicio({navigation}: any): JSX.Element {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      navigation.navigate('Encuestas');
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error happened');
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
