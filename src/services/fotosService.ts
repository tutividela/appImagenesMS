import { Imagen, InformacionDeFotos } from '../types/types';
import { storage } from '../utils/mmkv';

const url = 'https://backend-appsmoviles.onrender.com/families/';
const idtoken = storage.getString('idtoken');

namespace FotosService {
  export async function buscarPor(
    idFamilia: string,
    category: string,
  ): Promise<Imagen[]> {
    const response = await fetch(`${url}${idFamilia}`, {
      headers: { idtoken, category },
    });
    const fotos = await response.json();
    return fotos[category];

  }
  export async function buscarTodosDeEncuesta(idFamilia: string): Promise<InformacionDeFotos> {
    const response = await fetch(`${url}${idFamilia}`, {
      headers: { idtoken },
    });
    const fotos = await response.json() as InformacionDeFotos;
    
    return fotos;
  }
  export async function buscarTodos(): Promise<InformacionDeFotos[]> {
    const response = await fetch(`${url}`, {
      headers: {idtoken},
    });
    const todasLasFotos = await response.json() as InformacionDeFotos[];

    return todasLasFotos;
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
  export async function subir(
    informacionDeFotoASubir: any,
    idFamilia: string,
    category: string,
  ) {
    try {
      let form: FormData = new FormData();
      const urlImagenASubir: string = `${url}${idFamilia}`;
      console.log(informacionDeFotoASubir)
      form.append('image', { uri: informacionDeFotoASubir.uri, type: informacionDeFotoASubir.mime, name: 'imagen.jpg', fileName: `${Date.now()}.jpg` });
      form.append('category', category);
      await fetch(urlImagenASubir, {
        method: 'POST',
        headers: {
          'idtoken': idtoken,
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      });
    } catch (error: any) {
      console.log('Error en FotosService.subir: ', error);
    }
  }
}

export default FotosService;
