import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { FiltroEncuesta } from './FiltroEncuesta';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import React from 'react';
import { Boton } from './Boton';

type props = {
  showModal: boolean;
  handleShowModal: Function;
  handleFiltrarFamilias: Function;
};

export function ModalEncuestas({
  showModal,
  handleShowModal,
  handleFiltrarFamilias,
}: props): React.JSX.Element {
  const [apellido, setApellido] = useState('');
  const [provincia, setProvincia] = useState('');
  const [partido, setPartido] = useState('');
  const [barrio, setBarrio] = useState('');

  function filtrarFamilias() {
    handleShowModal(false);
    handleFiltrarFamilias({ apellido, provincia, partido, barrio });
    setApellido('');
    setProvincia('');
    setPartido('');
    setBarrio('');
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={() => handleShowModal(false)}
    >
      <ScrollView style={styles.contenedorModal}>
        <Pressable
          onPress={() => handleShowModal(false)}
          style={styles.iconoCerrar}
        >
          <FontAwesomeIcon icon={faClose} size={23} />
        </Pressable>
        <View style={styles.contenedorFiltros}>
          <FiltroEncuesta titulo="Apellido" handleOnChangeText={setApellido} />
          <FiltroEncuesta
            titulo="Provincia"
            handleOnChangeText={setProvincia}
          />
          <FiltroEncuesta titulo="Partido" handleOnChangeText={setPartido} />
          <FiltroEncuesta titulo="Barrio" handleOnChangeText={setBarrio} />
        </View>
        <View style={styles.contenedorBotones}>
          <Boton
            titulo="Buscar"
            onPress={() => filtrarFamilias()}
            style={styles.boton}
          />
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenedorModal: {
    flex: 1,
    flexDirection: 'column',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  iconoCerrar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 5,
  },
  contenedorFiltros: {
    padding: 35,
    paddingTop: 10,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boton: {
    backgroundColor: '#00bfff',
    borderRadius: 5,
  },
});
