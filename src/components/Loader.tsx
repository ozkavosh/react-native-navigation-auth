import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 30,
    elevation: 5,
    zIndex: 3,
  },
});

export default Loader;
