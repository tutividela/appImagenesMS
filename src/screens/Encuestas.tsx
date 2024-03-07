import {useEffect, useState} from 'react';
import {Encuesta} from '../types/types';
import {Familia} from '../components/Familia';
import React from 'react';

const url = 'https://backend-appsmoviles.onrender.com/encuestas';

export function Encuestas(): React.JSX.Element {
  const [familias, setFamilias] = useState([]);

  const Encuestas = () => (
    <>
      {familias.map((familia: Encuesta) => (
        <Familia familia={familia} />
      ))}
    </>
  );

  useEffect(() => {
    fetch(url)
      .then((response: Response) => response.json())
      .then(jsonData => setFamilias(jsonData))
      .catch(err => console.log(err));
  }, []);

  return <>{familias.length ? <Encuestas /> : null}</>;
}
