import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import { FiltroEncuesta } from './FiltroEncuesta';

type props = {
  showModal: boolean;
  handleShowModal: Function;
};

export function ModalEncuestas({
  showModal,
  handleShowModal,
}: props): JSX.Element {

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={() => handleShowModal(false)}>
      <View style={styles.contenedorModal}>
        <View style={styles.contenedorFiltros}>
          <FiltroEncuesta titulo='Apellido'/>
          <FiltroEncuesta titulo='Provincia'/>
          <FiltroEncuesta titulo='Partido'/>
          <FiltroEncuesta titulo='Barrio'/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenedorModal: {
    flex: 1,
    flexDirection: 'column',
  },
  contenedorFiltros: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
