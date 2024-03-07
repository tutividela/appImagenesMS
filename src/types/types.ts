export type Encuesta = {
  _id: string;
  apellido: string;
  estado: string;
  encuestaUno: {
    direccionUno: {
      partido: string;
      provincia: string;
      barrio: string;
    };
  };
};
