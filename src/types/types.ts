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

export type InformacionDeFotos = {
  _id: string;
  familyId: string;
  PreCC_croquisE1: Imagen[];
  PreCC_delanteCasa: Imagen[];
  PreCC_bano: Imagen[];
  PreCC_contratoAsignacion: Imagen[];
  PreCC_fichaInspeccionPozos: Imagen[];
  PostCC_modulo: Imagen[];
  PostCC_familiaDentro: Imagen[];
  PostCC_higienizacion: Imagen[];
  PostCC_cartaDonacion: Imagen[];
  PostCC_cartaCesionImagen: Imagen[];
};
