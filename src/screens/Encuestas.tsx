import { useEffect, useState } from 'react';
import { Encuesta } from '../types/types';
import { Familia } from '../components/Familia';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { ModalEncuestas } from '../components/ModalEncuestas';
import { storage } from '../utils/mmkv';
import {
  setCargandoEncuestas,
  setEncuestas,
} from '../store/slices/encuestas/encuestasSlice';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { buscarEntrevistas } from '../store/slices/encuestas/thunks';

export function Encuestas({ navigation }: any): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const idtoken = storage.getString('idtoken');
  const dispatch = useAppDispatch();
  const { cargandoEncuestas, encuestas } = useAppSelector(
    state => state.encuestas,
  );

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

    dispatch(setCargandoEncuestas(false));
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
    dispatch(setCargandoEncuestas(true));
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <TouchableOpacity
          onPress={() => onHandleShowModal(true)}
          style={styles.icono}
        >
          <FontAwesomeIcon icon={faFilter} color="#00bfff" size={30} />
        </TouchableOpacity>
      </View>
      <ModalEncuestas
        handleShowModal={onHandleShowModal}
        showModal={showModal}
        handleFiltrarFamilias={onHandleFiltrarFamilias}
      />
      <View style={styles.cuerpo}>
        {cargandoEncuestas ? (
          <ActivityIndicator color="#00bfff" size={50} />
        ) : encuestas.length ? (
          <FlatList
            data={encuestas}
            renderItem={({ item }) => (
              <Familia
                familia={item}
                key={item._id}
                handleMagnify={onHandleMagnify}
              />
            )}
            keyExtractor={(item: Encuesta) => item._id}
          />
        ) : (
          <View style={styles.contenedorNoHayFotos}>
            <Text style={styles.tituloNoHayFotos}>No hay fotos</Text>
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
    alignItems: 'flex-end',
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
