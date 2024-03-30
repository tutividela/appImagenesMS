import EncuestaService from '../../../services/encuestaService';
import { AppDispatch } from '../../store';
import { setCargando } from '../custom/customSlice';
import { setEncuestas } from './encuestasSlice';

export function buscarEntrevistas() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCargando(true));
      const encuestas = await EncuestaService.buscarTodas();
      dispatch(setEncuestas(encuestas));
    } catch (error: any) {
      dispatch(setCargando(false));
      return;
    }
    dispatch(setCargando(false));
  };
}
