import React from 'react';
import {Encuestas} from './src/screens/Encuestas';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Inicio} from './src/screens/Inicio';
import { Logout } from './src/components/Logout';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Inicio} initialParams={{titulo: 'hola'}} options={{headerRight: () => (<Logout />)}} />
        <Stack.Screen name="Encuestas" component={Encuestas} options={{headerRight: () => (<Logout />)}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
