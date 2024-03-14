import { faClose } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  Button,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

type props = {
  showModal: boolean;
  handleShowModal: Function;
  handleFiltrarCategorias: Function;
};

export function ModalCategorias({showModal, handleShowModal,}: props): JSX.Element {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={() => handleShowModal(false)}>
      <ScrollView style={styles.contenedorModal}>
        <Pressable
          onPress={() => handleShowModal(false)}
          style={styles.iconoCerrar}>
          <FontAwesomeIcon icon={faClose} size={23} />
        </Pressable>
        <View style={styles.contenedorCategorias}></View>
        <View style={styles.contenedorBotones}>
          <Button title="buscar" onPress={() => console.log('aca tengo que cerrar el modal')} />
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
      contenedorCategorias: {
        padding: 35,
        paddingTop: 10,
      },
      contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'center',
      },
});
