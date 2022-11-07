import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {StyledButton, StyledButtonText} from '../components/StyledButton';
import HelperText from '../components/HelperText';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import onGoogleButtonPress from '../utils/onGoogleButtonPress';
import { formReducer, LOGIN_FORM_INITIAL_VALUES } from '../utils/reducers/formReducer';

const Login = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, formDispatch] = React.useReducer(
    formReducer,
    LOGIN_FORM_INITIAL_VALUES,
  );

  const handleInputText = (fieldName, text) => {
    formDispatch({
      type: 'SET_FIELD_VALUE',
      payload: {field: fieldName, value: text},
    });
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      for (let k in formData) {
        if (!formData[k]) throw new Error('No puede haber campos vacíos!');
      }
      await auth().signInWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEyePress = () => {
    formDispatch({type: 'TOGGLE_PASSWORD_VISIBILITY'});
  };

  return (
    <View style={styles.mainContainer}>
      {loading && <Loader />}

      <Image source={require('../img/cato.png')} style={styles.bannerImg} />
      <SectionTitle>Bienvenido de vuelta!</SectionTitle>

      <TextInput
        style={styles.input}
        placeholder={'Email'}
        onChangeText={text => handleInputText('email', text)}></TextInput>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder={'Contraseña'}
          secureTextEntry={formData.hidePassword}
          onChangeText={text => handleInputText('password', text)}></TextInput>
        <TouchableOpacity onPress={handleEyePress} style={styles.passwordEye}>
          <Image
            source={require('../img/eye-icon.png')}
            style={styles.passwordEyeImg}
          />
        </TouchableOpacity>
      </View>

      <HelperText onPress={() => navigation.navigate('Signup')}>
        No tengo cuenta
      </HelperText>

      <StyledButton primary onPress={handleFormSubmit}>
        <StyledButtonText>Ingresar</StyledButtonText>
      </StyledButton>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>O bien</Text>
      </View>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() =>
          onGoogleButtonPress().then(() => navigation.navigate('Home'))
        }>
        <Image
          source={{
            uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
            width: 32,
            height: 32,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bannerImg: {width: 216, height: 216},
  input: {
    borderRadius: 10,
    width: '90%',
    height: 50,
    color: 'black',
    backgroundColor: '#F3EFF0',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  inputGroup: {width: '100%', alignItems: 'center'},
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    shadowColor: 'black',
    elevation: 4,
  },
  divider: {
    height: 1,
    width: '90%',
    backgroundColor: '#000000',
    marginVertical: 30,
  },
  dividerText: {
    position: 'absolute',
    paddingHorizontal: 15,
    bottom: -8,
    left: '40%',
    backgroundColor: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  passwordEye: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 30,
    top: 15,
  },
  passwordEyeImg: {width: '100%', height: '100%'},
});

export default Login;
