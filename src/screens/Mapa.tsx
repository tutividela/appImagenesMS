import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export function Mapa({route}: any): JSX.Element {
  const {latitud, longitud} = route.params;

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitud,
          longitude: longitud,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{latitude:latitud, longitude: longitud,}}
          pinColor="red"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
