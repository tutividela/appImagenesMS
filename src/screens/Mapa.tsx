import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

export function Mapa(): JSX.Element {
  return (
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        >
        <Marker coordinate={{latitude: 37.000, longitude: -120.000}} pinColor='red'/>
      </MapView>
  );
}

const styles = StyleSheet.create({
    map: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });