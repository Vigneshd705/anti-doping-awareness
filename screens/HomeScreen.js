import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Modules"
        onPress={() => navigation.navigate('ModuleScreen')}
      />
      <Button
        title="Chat with Bot"
        onPress={() => navigation.navigate('Chatbot')} // Navigate to Chatbot
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding:50,
  },
  Button:{
    padding:5,
  },
});

export default HomeScreen;
