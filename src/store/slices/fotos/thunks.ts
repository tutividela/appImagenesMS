import { Alert } from 'react-native';
import FotosService from '../../../services/fotosService';
import { AppDispatch } from '../../store';
import { setCargando } from '../custom/customSlice';
import { setFotos } from './fotosSlice';

export function buscarFotos(idFamilia: string, category: string) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCargando(true));
      const encuestas = await FotosService.buscarPor(idFamilia, category);
      dispatch(setFotos(encuestas));
    } catch (error: any) {
      dispatch(setCargando(false));
      return;
    }
    dispatch(setCargando(false));
  };
}

export function eliminarFoto(
  idFamilia: string,
  category: string,
  idFoto: string,
) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCargando(true));
      await FotosService.eliminar(idFamilia, category, idFoto);
      Alert.alert('Exito', 'La foto se ha eliminado exitosamente');
    } catch (error: any) {
      dispatch(setCargando(false));
      Alert.alert('Error', 'A ocurrido un error');
      return;
    }
    dispatch(setCargando(false));
  };
}

export function subirFoto(
  informacionDeFotoASubir: any,
  idFamilia: string,
  category: string,
) {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCargando(true));
      await FotosService.subir(informacionDeFotoASubir, idFamilia, category);
      Alert.alert('Exito', 'La foto se ha subido exitosamente');
    } catch (error: any) {
      dispatch(setCargando(false));
      Alert.alert('Error', 'A ocurrido un error');
    }
    dispatch(setCargando(false));
  };
}
