/* eslint-disable react/prop-types */
import React from 'react';
import {
  View, Text, Image, Dimensions, StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

export default function Details({ route }) {
  const { components } = route.params;
  const country = components.country_code;
  const { geometry } = route.params;
  console.log(geometry);

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
      <Image style={{ width: 64, height: 64 }} source={{ uri: `https://www.countryflags.io/${country}/flat/64.png` }} />
      <Text>{route.params.name}</Text>
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
});
