/* eslint-disable no-alert */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const handleSearch = async () => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${text}`;
      const cityInfo = await fetch(url);
      const response = await cityInfo.json();
      const { components } = response.results[0];
      const { geometry } = response.results[0];
      navigation.push('Details', { name: components.city, components, geometry });
    } catch (err) {
      alert(err);
    }
  };
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
            <TouchableOpacity style={styles.SingleButton} onPress={handleSearch}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Button
              buttonStyle={styles.SingleButton}
              icon={(
                <Icon
                  name="gps-fixed"
                  color="#fff"
                  size={20}
                />
              )}
            />
          </View>
        </SafeAreaView>

        <View style={styles.recentSearches}>
          <Text style={styles.textPrevious}>Previous Searches</Text>

          <View style={styles.recentSearchesElement}>
            <View style={styles.cityInfo}>
              <Text>Itapecirica da Serra</Text>
              <Text>NSL, ??</Text>
            </View>
            <Button
              buttonStyle={{ backgroundColor: 'transparent' }}
              icon={(
                <Icon
                  name="arrow-forward"
                  color="#FF2E4E"
                  size={30}
                />
              )}
            />
          </View>
        </View>
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
    marginBottom: 40,
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
  textPrevious: {
    fontSize: 25,
    fontWeight: 'bold',
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
  recentSearches: {
    marginTop: 20,
  },
  recentSearchesElement: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(224, 224, 224, 0.4)',
    height: 80,
    borderRadius: 15,
  },
  cityInfo: {
    height: 40,
    borderLeftColor: '#FF2E4E',
    borderLeftWidth: 3,
    paddingLeft: 10,
    justifyContent: 'center',
  },
});
export default Home;
