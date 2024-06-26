import React, { useState } from 'react';
import { Encuestas } from './src/screens/Encuestas';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Inicio } from './src/screens/Inicio';
import { Logout } from './src/components/Logout';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { Context } from './src/utils/context';
import { FotosDeFamilia } from './src/screens/FotosDeFamilia';
import { Usuario } from './src/components/Usuario';
import { Mapa } from './src/screens/Mapa';
import { enableLatestRenderer } from 'react-native-maps';
import { SubirFoto } from './src/screens/SubirFoto';

enableLatestRenderer();

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const [estaLogueado, setEstaLogueado] = useState(false);

  return (
    <Context.Provider value={{ estaLogueado, setEstaLogueado }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            {!estaLogueado ? (
              <Stack.Screen name="Inicio" component={Inicio} />
            ) : (
              <>
                <Stack.Screen
                  name="Encuestas"
                  component={Encuestas}
                  options={{
                    headerRight: () => <Logout />,
                    headerTitle: () => <Usuario />,
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="FotosDeFamilia"
                  component={FotosDeFamilia}
                  options={{
                    headerRight: () => <Logout />,
                    headerTitle: () => <Usuario />,
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="Mapa"
                  component={Mapa}
                  options={{
                    headerTitle: () => <Usuario />,
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="SubirFoto"
                  component={SubirFoto}
                  options={{
                    headerTitle: () => <Usuario />,
                    headerRight: () => <Logout />,
                    headerTitleAlign: 'center',
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </Context.Provider>
  );
}
export default App;
