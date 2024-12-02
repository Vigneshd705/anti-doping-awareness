import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Import HomeScreen
import ModulesScreen from './screens/ModuleScreen'; // Import ModulesScreen
import ChatbotScreen from './screens/ChatbotScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ModuleScreen" component={ModulesScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
