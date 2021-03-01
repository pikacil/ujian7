import React ,{ useState,useEffect }from 'react'
import * as eva from '@eva-design/eva';
import Register from './Screen/Register/Register';
import Login from './Screen/Login/Login';
import Menu from './Screen/Dashboard/Menu';
import Checkin from './Screen/Checkin/Checkin';
import Checkout from './Screen/Checkout/Checkout';
import Ijin from './Screen/Ijin/Ijin';
import Historyabsen from './Screen/Historyabsen/Historyabsen';

import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
 
  return (
    <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Login" component={Login}  options={{ title: '' }} />
        <Stack.Screen name="Menu" component={Menu} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Checkin" component={Checkin} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="Ijin" component={Ijin} />
    <Stack.Screen name="Historyabsen" component={Historyabsen} />
      </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </>
  )
}

export default App;
