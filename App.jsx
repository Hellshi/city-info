import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import store from './store/index';
import Home from './components/Home';
import Details from './components/Details';

const HomeStack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Home" component={Home} options={{ title: 'City Info' }} />
          <HomeStack.Screen
            name="Details"
            component={Details}
            options={({ route }) => ({
              title: route.params.name,
            })}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}
