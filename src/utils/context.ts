import { SetStateAction, createContext } from 'react';

export const Context = createContext({
    estaLogueado: false,
    setEstaLogueado: (valor: boolean): void => {}
});