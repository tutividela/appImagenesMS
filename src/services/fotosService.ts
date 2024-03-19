import { storage } from '../utils/mmkv';

const url = 'https://backend-appsmoviles.onrender.com/families/';
const idtoken = storage.getString('idtoken');

namespace FotosService {
  export async function buscarPor(
    idFamilia: string,
    category: string,
  ): Promise<any> {
    try {
      const response = await fetch(`${url}${idFamilia}`, {
        headers: { idtoken, category },
      });
      const fotos = await response.json();
      return fotos[category];
    } catch (error: any) {
      console.log('Error en FotosService.buscarPor: ', error);
    }
  }
  export async function eliminar(
    idFamilia: string,
    category: string,
    idFoto: string,
  ): Promise<void> {
    try {
      await fetch(`${url}${idFamilia}/${category}/${idFoto}`, {
        method: 'DELETE',
        headers: { idtoken },
      });
    } catch (error: any) {
      console.log('Error en FotosService.eliminar: ', error);
    }
  }
}

export default FotosService;
