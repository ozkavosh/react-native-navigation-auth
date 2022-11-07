import {Image, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {useAuth} from '../hooks/useAuth';
import {StyledButton, StyledButtonText} from '../components/StyledButton';

//Componente que controla que el usuario este logueado para renderizar el componente hijo, si no lo está muestra otro componente.
const AuthRoute = ({navigation, children}) => {
  const {user} = useAuth(); //Usuario actual

  //Si el usuario no es null/undefined quiere decir que esta logueado y renderizará el hijo
  return user ? (
    children
  ) : (
    <SafeAreaView
      style={styles.mainContainer}>
      <Image
        source={require('../img/secure.png')}
        style={styles.infoImg}
      />
      <Text style={styles.infoText}>
        Para ver esta sección debes{' '}
        <Text style={styles.infoTextSpan}>
          iniciar sesión
        </Text>
      </Text>

      <StyledButton primary onPress={() => navigation.navigate('Login')}>
        <StyledButtonText>Ir a Login</StyledButtonText>
      </StyledButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  infoImg: {width: 316, height: 316},
  infoText: {marginVertical: 15},
  infoTextSpan: {fontWeight: 'bold', color: 'crimson'}
})

export default AuthRoute;
