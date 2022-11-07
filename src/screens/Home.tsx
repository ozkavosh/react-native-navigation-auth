import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {StyledButton, StyledButtonText} from '../components/StyledButton';
import auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const {user} = useAuth(); //Usuario actual

  return (
    user && (
      <SafeAreaView style={styles.mainContainer}>
        {/* StatusBar */}
        <StatusBar backgroundColor="crimson" />

        <View style={styles.userStatusBar}>
          <View style={styles.userAvatar}>
            {user.photoURL ? (
              <Image
                style={styles.avatarImg}
                source={{uri: user.photoURL, width: 128, height: 128}}
              />
            ) : (
              <View style={styles.avatarPlaceHolder} />
            )}
          </View>

          <Text style={styles.welcomeHeading}>
            Bienvenido{' '}
            <Text style={styles.welcomeHeadingSpan}>{user.displayName}</Text>
          </Text>
        </View>

        <StyledButton primary onPress={() => navigation.navigate('Counter')}>
          <StyledButtonText>Contador</StyledButtonText>
        </StyledButton>

        <StyledButton onPress={() => auth().signOut()}>
          <StyledButtonText>Salir</StyledButtonText>
        </StyledButton>
      </SafeAreaView>
    )
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, alignItems: 'center', backgroundColor: 'white'},
  welcomeHeading: {
    fontSize: 24,
    color: 'white',
    paddingVertical: 5,
  },
  welcomeHeadingSpan: {fontWeight: 'bold'},
  avatarPlaceHolder: {
    width: 128,
    height: 128,
    backgroundColor: 'crimson',
    borderRadius: 60,
  },
  avatarImg: {
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
  },
  userAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  userStatusBar: {
    backgroundColor: 'crimson',
    width: '100%',
    alignItems: 'center',
    marginBottom: '50%',
    paddingBottom: 25,
    paddingTop: 15,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
});

export default Home;
