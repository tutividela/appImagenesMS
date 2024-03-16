import {Image, StyleSheet, Text, View} from 'react-native';
import {storage} from '../utils/mmkv';

export function Usuario(): JSX.Element {
  const usuario = storage.getString('usuario');
  const urlFotoDePerfil = storage.getString('urlFoto');
  return (
    <View style={styles.contenedor}>
      <Image source={{uri: urlFotoDePerfil}} style={styles.imagen} />
      <Text style={styles.usuario}>{usuario}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  usuario: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  imagen: {
    width: 40,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
