import EncuestaService from '../../../services/encuestaService';
import { AppDispatch } from '../../store';
import { setCargandoEncuestas, setEncuestas } from './encuestasSlice';

export function buscarEntrevistas() {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCargandoEncuestas(true));
      const encuestas = await EncuestaService.buscarTodas();
      dispatch(setEncuestas(encuestas));
    } catch (error: any) {
      dispatch(setCargandoEncuestas(false));
      return;
    }
    dispatch(setCargandoEncuestas(false));
  };
}
