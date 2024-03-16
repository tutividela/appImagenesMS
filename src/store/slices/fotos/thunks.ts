import FotosService from "../../../services/fotosService";
import { AppDispatch, RootState } from "../../store";
import { setCargando } from "../custom/customSlice";
import { setFotos } from "./fotosSlice";

export function buscarFotos(idFamilia: string, category: string) {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch(setCargando(true));
            const encuestas = await FotosService.buscarPor(idFamilia, category);
            dispatch(setFotos(encuestas));
        }catch(error: any) {
            dispatch(setCargando(false));
            return;
        }
        dispatch(setCargando(false));
    }
}