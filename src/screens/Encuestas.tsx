import {useEffect, useState} from 'react';
import {Encuesta} from '../types/types';
import {Familia} from '../components/Familia';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {ModalEncuestas} from '../components/ModalEncuestas';

const url = 'https://backend-appsmoviles.onrender.com/encuestas';

export function Encuestas(): React.JSX.Element {
  const [familias, setFamilias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response: Response) => response.json())
      .then(jsonData => {
        setFamilias(jsonData);
        setCargando(false);
      })
      .catch(err => console.log(err));
  }, []);

  function onHandleShowModal(valor: boolean): void {
    setShowModal(valor);
  }
  function onHandleFiltrarFamilias(encuesta: any): void {
    let encuestasFiltradas = familias;

    setCargando(true);
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
    setFamilias(encuestasFiltradas);
    setCargando(false);
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.cabecera}>
        <Text style={styles.titulo}>Encuestas</Text>
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
        {!cargando ? (
          <FlatList
            data={familias}
            renderItem={({item}) => <Familia familia={item} key={item._id} />}
            keyExtractor={(item: Encuesta) => item._id}
          />
        ) : (
          <ActivityIndicator color="#00bfff" size={50} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#a9a9a9',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  cuerpo: {
    flex: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
