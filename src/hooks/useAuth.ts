import React from 'react';
import auth from '@react-native-firebase/auth';

export function useAuth() {
  const [user, setUser] = React.useState<any>();

  const onAuthStateChanged = (user) => {
    setUser(user);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return {
    user,
    setUser
  };
}