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

export type Imagen = {
  _id: string;
  imageName: string;
  latitude: number | null;
  longitude: number | null;
};

export const categorias: string[] = [
  'PreCC_croquisE1',
  'PreCC_delanteCasa',
  'PreCC_bano',
  'PreCC_contratoAsignacion',
  'PreCC_fichaInspeccionPozos',
  'PostCC_modulo',
  'PostCC_familiaDentro',
  'PostCC_higienizacion',
  'PostCC_cartaDonacion',
  'PostCC_cartaCesionImagen',
];
