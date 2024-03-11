import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons';

export function Logout(): JSX.Element {
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('Usuario se deslogueo');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={signOut}>
        <FontAwesomeIcon icon={faSignOut} style={styles.logout}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    logout: {
    }
});