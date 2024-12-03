import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Import HomeScreen
import ModulesScreen from './screens/ModuleScreen'; // Import ModulesScreen
import ChatbotScreen from './screens/ChatbotScreen'
import ChaptersScreen from './screens/ChapterScreen';
import VideoScreen from './screens/VideoScreen';
import QuizScreen from './screens/QuizScreen';
import ModuleQuizScreen from './screens/ModuleQuizScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#03615b',  // Green color for the header background
          },
          headerTintColor: '#ffffff',  // White color for the title and icons
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ModuleScreen" component={ModulesScreen} />
        <Stack.Screen name="Chatbot" component={ChatbotScreen} />
        <Stack.Screen name="ChaptersScreen" component={ChaptersScreen} options={{ title: 'Chapters' }} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} options={{ title: 'Video' }} />
        <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Chapter Quiz' }} />
        <Stack.Screen name="ModuleQuizScreen" component={ModuleQuizScreen} options={{ title: 'Module Quiz' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
