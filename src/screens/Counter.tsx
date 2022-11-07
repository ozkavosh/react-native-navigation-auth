import React from "react";
import { increment, decrement } from "../features/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {StyledButton, StyledButtonText} from '../components/StyledButton';
import { useAuth } from "../hooks/useAuth";
import auth from '@react-native-firebase/auth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    padding: 50,
  },
  title_text: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 55,
  },
  counter_text: {
    fontSize: 35,
    fontWeight: "900",
    margin: 15,
  },
  btn: {
    backgroundColor: "#086972",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 23,
    color: "#fff",
  },
});

const Counter = ({navigation}) => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.value);

  const handleIncreament = () => {
    dispatch(increment());
  };

  const handleDecreament = () => {
    dispatch(decrement());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Contador</Text>
      <Text style={styles.counter_text}>{counter}</Text>
      <TouchableOpacity onPress={handleIncreament} style={styles.btn}>
        <Text style={styles.btn_text}> Sumar </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDecreament}
        style={{ ...styles.btn, backgroundColor: "#6e3b3b" }}
      >
        <Text style={styles.btn_text}> Restar </Text>
      </TouchableOpacity>
      
      <StyledButton style={{ marginTop: 'auto' }} primary onPress={() => auth().signOut()}>
          <StyledButtonText>Salir</StyledButtonText>
      </StyledButton>
    </View>
  );
};

export default Counter;
