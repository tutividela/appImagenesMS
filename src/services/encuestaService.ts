import { Encuesta } from "../types/types";

namespace EncuestaService {
    export async function buscarTodas(): Promise<any> {
        const url = 'https://backend-appsmoviles.onrender.com/encuestas';
        try {
            const entrevistas = await fetch(url);
            return await entrevistas.json() as Encuesta[];
        }catch(error: any) {
            console.log("Error en EncuestaService.buscarTodas: ", error);
        }
    }
}

export default EncuestaService;