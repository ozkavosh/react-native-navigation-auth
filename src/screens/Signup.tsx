import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {StyledButton, StyledButtonText} from '../components/StyledButton';
import HelperText from '../components/HelperText';
import SectionTitle from '../components/SectionTitle';
import Loader from '../components/Loader';
import onGoogleButtonPress from '../utils/onGoogleButtonPress';
import {
  formReducer,
  SIGNUP_FORM_INITIAL_VALUES,
} from '../utils/reducers/formReducer';

const Signup = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, formDispatch] = React.useReducer(
    formReducer,
    SIGNUP_FORM_INITIAL_VALUES,
  );

  const handleInputSubmit = async () => {
    try {
      setLoading(true);
      for (let k in formData) {
        if (!formData[k]) {
          if (k === 'avatar')
            return Alert.alert(
              'Error',
              `El avatar no puede quedar vacío. Por favor seleccione un avatar desde el icono de la cámara.`,
            );
          if (k === 'displayName')
            return Alert.alert(
              'Error',
              `El campo nombre no puede quedar vacío`,
            );
          if (k === 'email')
            return Alert.alert('Error', `El campo email no puede quedar vacío`);
          if (k === 'password')
            return Alert.alert(
              'Error',
              `El campo contraseña no puede quedar vacío`,
            );
        }
      }
      await auth().createUserWithEmailAndPassword(
        formData.email,
        formData.password,
      );
      const avatarRef = storage().ref(`${formData.email}.png`);
      await avatarRef.putFile(formData.avatar);
      const avatarUrl = await avatarRef.getDownloadURL();
      await auth().currentUser.updateProfile({
        displayName: formData.displayName,
        photoURL: avatarUrl,
      });
      await auth().signOut();
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

  const handleInputText = (fieldName, text) => {
    formDispatch({
      type: 'SET_FIELD_VALUE',
      payload: {field: fieldName, value: text},
    });
  };

  const handleCameraButton = async () => {
    try {
      const image: any = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 400,
        maxHeight: 400,
      });
      formDispatch({
        type: 'SET_FIELD_VALUE',
        payload: {field: 'avatar', value: image.assets[0].uri},
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEyePress = () => {
    formDispatch({type: 'TOGGLE_PASSWORD_VISIBILITY'});
  };

  return (
    <View
      style={styles.mainContainer}>
      {loading && <Loader />}
      <SectionTitle>Registra tu usuario!</SectionTitle>

      <View style={styles.avatar}>
        {formData.avatar ? (
          <Image
            style={styles.avatarImg}
            source={{uri: formData.avatar, width: 64, height: 64}}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>
              ?
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={handleCameraButton}
          style={styles.cameraButton}>
          <Image
            source={{
              uri: 'https://pixsector.com/cache/d01b7e30/av7801257c459e42a24b5.png',
              width: 32,
              height: 32,
            }}
          />
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder={'Nombre completo'}
        onChangeText={text => handleInputText('displayName', text)}></TextInput>

      <TextInput
        style={styles.input}
        placeholder={'Email'}
        onChangeText={text => handleInputText('email', text)}></TextInput>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          secureTextEntry={formData.hidePassword}
          placeholder={'Contraseña'}
          onChangeText={text => handleInputText('password', text)}></TextInput>
        <TouchableOpacity onPress={handleEyePress} style={styles.passwordEye}>
          <Image
            source={require('../img/eye-icon.png')}
            style={styles.passwordEyeImg}
          />
        </TouchableOpacity>
      </View>

      <HelperText onPress={() => navigation.navigate('Login')}>
        Ya tengo cuenta
      </HelperText>

      <StyledButton primary onPress={handleInputSubmit}>
        <StyledButtonText>Registrar</StyledButtonText>
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
  avatar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  avatarImg: {marginLeft: '40%', borderRadius: 30},
  avatarPlaceholder: {
    width: 64,
    height: 64,
    backgroundColor: 'crimson',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginLeft: '40%',
  },
  cameraButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3EFF0',
    borderRadius: 15,
    marginLeft: 15,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
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

export default Signup;
