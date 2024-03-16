import {Encuesta} from '../types/types';
import { storage } from '../utils/mmkv';

const url = 'https://backend-appsmoviles.onrender.com/encuestas';
const idtoken = storage.getString('idtoken');

namespace EncuestaService {
  export async function buscarTodas(): Promise<any> {
    try {
      const response = await fetch(url,{headers: {idtoken}});
      return (await response.json()) as Encuesta[];
    } catch (error: any) {
      console.log('Error en EncuestaService.buscarTodas: ', error);
    }
  }
}

export default EncuestaService;
