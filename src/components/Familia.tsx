import {StyleSheet, Text, View} from 'react-native';
import {Encuesta} from '../types/types';

type props = {
  familia: Encuesta;
};

export function Familia({familia}: props): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>{familia._id}</Text>
      <Text>{familia.apellido}</Text>
      <Text>{familia.estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        margin: 10,
    }
});