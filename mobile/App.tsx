import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './src/store';
import EventComponent from './src/components/event.component';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ItemListComponent from './src/components/item-list.component';
const Stack = createStackNavigator();


const App = () => {
  return (
    <>
    <NavigationContainer>
      
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
      <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={EventComponent}
            options={{ title: 'Events' }}
          />
          <Stack.Screen name="ItemList" component={ItemListComponent} options={{ title: 'Items' }} />
        </Stack.Navigator>
      </Provider>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F194FF',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
});

export default App; 
