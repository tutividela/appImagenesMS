import { useEffect, useRef, useState } from 'react';
import { Encuesta } from '../types/types';
import { Familia } from '../components/Familia';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { ModalEncuestas } from '../components/ModalEncuestas';
import { setEncuestas } from '../store/slices/encuestas/encuestasSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { buscarEntrevistas } from '../store/slices/encuestas/thunks';
import { setCargando } from '../store/slices/custom/customSlice';

export function Encuestas({ navigation }: any): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { encuestas } = useAppSelector(state => state.encuestas);
  const { cargando } = useAppSelector(state => state.custom);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    dispatch(buscarEntrevistas());
  }, []);

  function onHandleMagnify(idFamilia: string, apellido: string): void {
    navigation.navigate('FotosDeFamilia', {
      idFamilia: idFamilia,
      apellido: apellido,
    });
  }

  function onHandleShowModal(valor: boolean): void {
    setShowModal(valor);
  }
  function onHandleFiltrarFamilias(encuesta: any): void {
    let encuestasFiltradas = encuestas;

    dispatch(setCargando(true));
    if (encuesta.apellido) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.apellido === encuesta.apellido,
      );
    } else if (encuesta.provincia) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.encuestaUno.direccion.provincia ===
          encuesta.provincia,
      );
    } else if (encuesta.partido) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.encuestaUno.direccion.partido === encuesta.partido,
      );
    } else if (encuesta.barrio) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.encuestaUno.direccion.barrio === encuesta.barrio,
      );
    }
    dispatch(setEncuestas(encuestasFiltradas));
    dispatch(setCargando(false));
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <TouchableOpacity onPress={() => dispatch(buscarEntrevistas())}>
          <FontAwesomeIcon icon={faRotateRight} color="#00bfff" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onHandleShowModal(true)}>
          <FontAwesomeIcon icon={faFilter} color="#00bfff" size={30} />
        </TouchableOpacity>
      </View>
      <ModalEncuestas
        handleShowModal={onHandleShowModal}
        showModal={showModal}
        handleFiltrarFamilias={onHandleFiltrarFamilias}
      />
      <View style={styles.cuerpo}>
        {cargando ? (
          <ActivityIndicator color="#00bfff" size={50} />
        ) : encuestas.length ? (
          <Animated.FlatList
            data={encuestas}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            renderItem={({ item, index }) => (
              <Familia index={index} familia={item} handleMagnify={onHandleMagnify} scrollY={scrollY} />
            )}
            keyExtractor={(item: Encuesta) => item._id}
          />
        ) : (
          <View style={styles.contenedorNoHayFotos}>
            <Text style={styles.tituloNoHayFotos}>No hay encuestas</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    margin: 10,
  },
  cabecera: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#c0c0c0',
  },
  icono: {
    flex: 1,
    justifyContent: 'center',
  },
  cuerpo: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contenedorNoHayFotos: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tituloNoHayFotos: {
    fontSize: 20,
  },
});
