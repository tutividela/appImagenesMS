import { ActivityIndicator, StyleSheet, View } from 'react-native';

type props = {
  cargando: boolean;
  color: string;
  tamanioIcono: number;
  children: React.ReactNode;
};

export function IndicadorCargando({
  color,
  tamanioIcono,
  children,
  cargando,
}: props): JSX.Element {
  return (
    <View style={styles.contenedor}>
      <ActivityIndicator
        size={tamanioIcono}
        color={color}
        animating={cargando}
      />
      {cargando ? children : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
