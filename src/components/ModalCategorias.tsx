import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setShowModal } from '../store/slices/custom/customSlice';
import { categorias } from '../types/types';
import { ItemCategoria } from './ItemCategoria';

export function ModalCategorias(): JSX.Element {
  const { showModal } = useAppSelector(state => state.custom);
  const dispatch = useAppDispatch();

  function handleCloseModal() {
    dispatch(setShowModal(false));
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showModal}
      onRequestClose={() => handleCloseModal()}
    >
      <ScrollView style={styles.contenedorModal}>
        <TouchableOpacity
          onPress={() => handleCloseModal()}
          style={styles.iconoCerrar}
        >
          <FontAwesomeIcon icon={faClose} size={23} />
        </TouchableOpacity>
        <View style={styles.contenedorCategorias}>
          <ScrollView>
            {categorias.map((categoria: string, index: number) => (
              <ItemCategoria nombre={categoria} key={index} />
            ))}
          </ScrollView>
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
    padding: 25,
    paddingTop: 10,
  },
  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
