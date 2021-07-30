/* eslint-disable max-len */
/* eslint-disable camelcase */
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
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { citiesSliceActions } from '../store/citySlice';

const Home = ({ navigation }) => {
  const [text, onChangeText] = React.useState('');
  const citties = useSelector((state) => state.city.recentSearched);

  const dispatch = useDispatch();
  const handleSearch = async (url) => {
    try {
      const cityInfo = await fetch(url);
      const response = await cityInfo.json();
      const { components } = response.results[0];
      const { geometry } = response.results[0];
      dispatch(citiesSliceActions.addCity({
        components,
        geometry,
      }));
      const name = components.city ? components.name : components.city_district;
      navigation.push('Details', { name, components, geometry });
    } catch (err) {
      alert(err);
    }
  };
  const [error, setError] = useState(null);
  const handleCurrentLoaction = async () => {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Acess to location is needed');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=4b07849320724fcab06079515b162e5e`;
      handleSearch(url);
    } catch (err) {
      alert(error);
    }
  };
  const handlePrevCity = (city) => {
    const name = city.components.city ? city.components.name : city.components.city_district;
    navigation.push('Details', { name, components: city.components, geometry: city.geometry });
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
            <TouchableOpacity style={styles.SingleButton} onPress={() => handleSearch(`https://api.opencagedata.com/geocode/v1/json?key=e85809527b0341b18712ec1bacc3aab9&q=${text}`)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <Button
              onPress={handleCurrentLoaction}
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
          {citties.map((citty) => (
            <View style={styles.recentSearchesElement} key={citties.indexOf(citty)}>
              <View style={styles.cityInfo}>
                <Text>{citty.components.city_district ? citty.components.city_district : citty.components.city_district}</Text>
                <Text>
                  {citty.components.state}
                  /
                  {citty.components.state_code}
                </Text>
              </View>
              <Button
                onPress={() => handlePrevCity(citty)}
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
          ))}
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
