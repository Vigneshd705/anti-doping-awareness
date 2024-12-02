import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

const ChatbotScreen = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const parseText = (text) => {
    const lines = text.split('\n'); // Split by newlines for each line of input

    return lines.map((line, index) => {
      // Check if the line starts with a bullet point * and process it
      if (line.trim().startsWith('* ')) {
        const bulletText = line.replace(/^\*\s*/, ''); // Remove * and space
        return (
          <View key={index} style={styles.bulletContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.messageText}>{bulletText}</Text>
          </View>
        );
      }

      // Check if the line has bold text wrapped in **
      const boldText = line.match(/\*\*(.*?)\*\*/g); // Match anything wrapped in **

      if (boldText) {
        return (
          <Text key={index}>
            {line.split(/\*\*(.*?)\*\*/).map((part, idx) => {
              return (
                <Text key={idx} style={part.match(/\*\*(.*?)\*\*/g) ? styles.bold : null}>
                  {part}
                </Text>
              );
            })}
          </Text>
        );
      }

      // If no specific format, return normal text
      return <Text key={index} style={styles.messageText}>{line}</Text>;
    });
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: new Date().getTime().toString(),
      text: message,
      sender: 'user',
    };

    // Update chat history with user's message
    setChatHistory((prev) => [...prev, newMessage]);
    setLoading(true);
    setMessage('');

    try {
      // Send message to FastAPI endpoint using Axios
      const response = await axios.post('http://127.0.0.1:8000/api/api1/', {
        message: newMessage.text,
      });

      // Extract response from the FastAPI chatbot
      const chatbotReply = response.data.response_text || 'No response text';

      // Add chatbot's response to chat history
      const botMessage = {
        id: new Date().getTime().toString(),
        text: chatbotReply,
        sender: 'bot',
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error occurred';
      const errorMessageObj = {
        id: new Date().getTime().toString(),
        text: errorMessage,
        sender: 'bot',
      };
      setChatHistory((prev) => [...prev, errorMessageObj]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.chatContainer} keyboardShouldPersistTaps="handled">
        {chatHistory.map((item) => (
          <View
            key={item.id}
            style={[styles.message, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>
              {item.sender === 'bot' ? parseText(item.text) : item.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <Button title={loading ? 'Sending...' : 'Send'} onPress={sendMessage} disabled={loading} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  chatContainer: {
    flexGrow: 1, // Ensures ScrollView grows with content
    paddingBottom: 10,
  },
  message: {
    marginVertical: 5,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  userMessage: {
    backgroundColor: '#4caf50',
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  botMessage: {
    backgroundColor: '#eeeeee',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 18, // Increased font size for chat messages
    color: '#333',
    lineHeight: 28, // Increased line height for better readability
    letterSpacing: 0.5, // Increased letter spacing for better readability
  },
  bold: {
    fontWeight: 'bold',
  },
  bulletContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 10, // Adds indentation for bullet points
    marginBottom: 5,
  },
  bullet: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 5,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
});

export default ChatbotScreen;
