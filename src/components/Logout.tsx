import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../utils/mmkv';
import { useContext } from 'react';
import { Context } from '../utils/context';

export function Logout(): JSX.Element {
  const { setEstaLogueado } = useContext(Context);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      storage.clearAll();
      console.log('Usuario se deslogueo');
      setEstaLogueado(false);
    } catch (error) {
      console.error(error);
    }
  };

  function handleLogout(): void {
    Alert.alert('Advertencia', '¿Esta seguro que quiere cerrar sesion?', [
      { text: 'Si', onPress: async () => await signOut() },
      { text: 'No',}
    ]);
  }

  return (
    <TouchableOpacity onPress={() => handleLogout()}>
      <FontAwesomeIcon icon={faSignOut} style={styles.logout} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logout: {
    color: '#00bfff',
  },
});
