/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.text}>Type Your Location Here</Text>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Type a City Here"
            value={text}
          />
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.SingleButton}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Button style={styles.SingleButton}>
              <Text>AA</Text>
            </Button>
          </View>
        </SafeAreaView>

      </View>

    </View>

  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: 300,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    width: 300,
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2);',
    borderRadius: 15,
    paddingLeft: 15,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SingleButton: {
    width: 100,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FF2E4E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Home;
