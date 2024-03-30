import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

type props = {
  titulo: string;
  style: any;
  onPress: Function;
  nombreDeIcono?: IconDefinition;
  deshabilitar?: boolean;
};

export function Boton({
  titulo,
  style,
  onPress,
  nombreDeIcono,
  deshabilitar,
}: props): JSX.Element {
  return (
    <TouchableOpacity onPress={() => onPress()} style={style} disabled={deshabilitar}>
      <View style={styles.contenedor}>
        <Text style={styles.texto}>{titulo}</Text>
        {nombreDeIcono && (
          <FontAwesomeIcon icon={nombreDeIcono} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: 'white',
    padding: 10,
    fontSize: 18,
  },
});
