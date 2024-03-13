export type Encuesta = {
  _id: string;
  apellido: string;
  estado: string;
  encuestaUno: {
    direccion: {
      partido: string;
      provincia: string;
      barrio: string;
    };
  };
};

export type Custom = {
  estaLogueado: boolean;
}