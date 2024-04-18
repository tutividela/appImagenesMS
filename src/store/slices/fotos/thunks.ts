import { Alert } from 'react-native';
import FotosService from '../../../services/fotosService';
import { AppDispatch, RootState } from '../../store';
import { setCargando } from '../custom/customSlice';
import {
  setFotos,
  setTodasImagenesDeEncuesta,
  setTodasImagenesDeTodasEncuesta,
} from './fotosSlice';

export function buscarFotos(idFamilia: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { categoriaActual } = getState().custom;
      dispatch(setCargando(true));
      const encuestas = await FotosService.buscarPor(
        idFamilia,
        categoriaActual,
      );
      dispatch(setFotos(encuestas));
    } catch (error: any) {
      console.log('Error en buscarFotos: ', error);
      dispatch(setCargando(false));
      return;
    }
    dispatch(setCargando(false));
  };
}
export function buscarTodosDeEncuesta(idFamilia: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setCargando(true));
      const imagenes = await FotosService.buscarTodosDeEncuesta(idFamilia);
      dispatch(setTodasImagenesDeEncuesta(imagenes));
    } catch (error: any) {
      dispatch(setCargando(false));
      return;
    }
    dispatch(setCargando(false));
  };
}

export function buscarTodos() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setCargando(true));
      const imagenes = await FotosService.buscarTodos();
      dispatch(setTodasImagenesDeTodasEncuesta(imagenes));
    } catch (error: any) {
      dispatch(setCargando(false));
      return;
    }
    dispatch(setCargando(false));
  };
}

export function eliminarFoto(idFamilia: string, idFoto: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { categoriaActual } = getState().custom;
      dispatch(setCargando(true));
      await FotosService.eliminar(idFamilia, categoriaActual, idFoto);
      Alert.alert('Exito', 'La foto se ha eliminado exitosamente');
    } catch (error: any) {
      dispatch(setCargando(false));
      Alert.alert('Error', 'A ocurrido un error');
      return;
    }
    dispatch(setCargando(false));
  };
}

export function subirFoto(informacionDeFotoASubir: any, idFamilia: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const { categoriaActual } = getState().custom;
      dispatch(setCargando(true));
      await FotosService.subir(
        informacionDeFotoASubir,
        idFamilia,
        categoriaActual,
      );
      Alert.alert('Exito', 'La foto se ha subido exitosamente');
    } catch (error: any) {
      dispatch(setCargando(false));
      Alert.alert('Error', 'A ocurrido un error');
    }
    dispatch(setCargando(false));
  };
}
