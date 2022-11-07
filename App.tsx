import React from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import Counter from './src/screens/Counter';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import AuthRoute from './src/components/AuthRoute';
import store from './src/features/store';

///// Configuración inicial para login con Google ////
GoogleSignin.configure({
  webClientId:
    '#',
});

//// Tema del navegador ////
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

//// Navegadores ////
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//// Tabs (TODO: Exportar a otro componente) ////
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          //Obtener el icono del tab según el nombre de la ruta
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Counter') {
            iconName = 'calculator';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'crimson',
        tabBarInactiveTintColor: 'gray',
      })}>
      {/* Pantalla Home, es envuelta por el componente AuthRoute para que no se muestre si no se esta logueado */}
      <Tab.Screen name="Home">
        {props => (
          <AuthRoute {...props}>
            <Home {...props} />
          </AuthRoute>
        )}
      </Tab.Screen>

      {/* Pantalla Counter, es envuelta por el componente AuthRoute para que no se muestre si no se esta logueado */}
      <Tab.Screen name="Counter">
        {props => (
          <AuthRoute {...props}>
            <Counter {...props} />
          </AuthRoute>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

//// App ////
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={customTheme}>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          {/* TabsNavigator (Contiene a Home y Counter) se encuentra dentro del componente Home, por lo que Login y Signup no tendrán tabs pero Home y Counter si */}
          <Drawer.Screen name="Home" component={HomeTabs} />
          <Drawer.Screen name="Login" component={Login} />
          <Drawer.Screen name="Signup" component={Signup} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
