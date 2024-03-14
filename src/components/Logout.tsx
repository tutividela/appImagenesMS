import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../utils/mmkv';
import { useContext } from 'react';
import { Context } from '../utils/context';

export function Logout(): JSX.Element {
  const {setEstaLogueado} = useContext(Context);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      storage.removeItem('usuario');
      storage.removeItem('urlFoto');
      storage.removeItem('idtoken');
      console.log('Usuario se deslogueo');
      setEstaLogueado(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={signOut}>
        <FontAwesomeIcon icon={faSignOut} style={styles.logout} size={20}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    logout: {
      color: '#00bfff',
    },
});
