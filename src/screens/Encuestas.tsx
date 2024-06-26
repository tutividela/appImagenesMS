import { useEffect, useRef } from 'react';
import { Encuesta } from '../types/types';
import { Familia } from '../components/Familia';
import React from 'react';
import {
  ActivityIndicator,
  Animated,
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
import { setCargando, setShowModal } from '../store/slices/custom/customSlice';
import { IndicadorCargando } from '../components/IndicadorCargando';

export function Encuestas({ navigation }: any): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { encuestas } = useAppSelector(state => state.encuestas);
  const { cargando, showModal } = useAppSelector(state => state.custom);

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
    dispatch(setShowModal(valor));
  }
  function onHandleFiltrarFamilias(encuesta: any): void {
    let encuestasFiltradas = encuestas;
    console.log(encuesta);

    dispatch(setCargando(true));
    if (encuesta.apellido.length > 0) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.apellido === encuesta.apellido,
      );
    }
    if (encuesta.provincia.length > 0) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.encuestaUno.direccion.provincia ===
          encuesta.provincia,
      );
    }
    if (encuesta.partido.length > 0) {
      encuestasFiltradas = encuestasFiltradas.filter(
        (encuestaFiltrada: Encuesta) =>
          encuestaFiltrada.encuestaUno.direccion.partido === encuesta.partido,
      );
    }
    if (encuesta.barrio.length > 0) {
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
          <IndicadorCargando color="#00bfff" tamanioIcono={50} cargando={true}>
            <Text style={{ fontSize: 18 }}>Cargando encuestas</Text>
            <Text style={{ fontSize: 18 }}>Por favor espere...</Text>
          </IndicadorCargando>
        ) : encuestas.length ? (
          <Animated.FlatList
            data={encuestas}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true },
            )}
            renderItem={({ item, index }) => (
              <Familia
                index={index}
                familia={item}
                handleMagnify={onHandleMagnify}
                scrollY={scrollY}
              />
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
