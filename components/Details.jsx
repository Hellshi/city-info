/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Image, Dimensions, StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';
import { Text } from 'react-native-elements';

export default function Details({ route }) {
  const { components } = route.params;
  const country = components.country_code;
  const { geometry } = route.params;

  return (
    <View>
      <MapView
        style={styles.map}
        region={{
          latitude: geometry.lat,
          longitude: geometry.lng,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      />
      <View style={styles.main}>
        <View style={styles.headers}>
          <Image
            style={{
              width: 64, height: 64,
            }}
            source={{ uri: `https://www.countryflags.io/${country}/flat/64.png` }}
          />
          <Text h3>{route.params.name}</Text>
        </View>

        <View style={styles.info}>
          <Text>
            Continent:
            {' '}
            {`${components.country}`}
          </Text>
          <Text>
            Municipality:
            {' '}
            {`${components.municipality}`}
          </Text>
          <Text>
            Region:
            {' '}
            {`${components.region}`}
          </Text>
          <Text>
            State:
            {' '}
            {`${components.state}/${components.state_code}`}
          </Text>
          <Text>
            State District:
            {' '}
            {`${components.state_district}`}
          </Text>
        </View>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  main: {
    width: 300,
    alignSelf: 'center',
  },
  headers: {
    width: 300,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    minHeight: 150,
    justifyContent: 'space-between',
  },
});
