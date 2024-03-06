import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {Encuesta} from '../types/types';
import {Familia} from '../components/Familia';

const url = 'https://backend-appsmoviles.onrender.com/encuestas';

export function Encuestas(): JSX.Element {
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
