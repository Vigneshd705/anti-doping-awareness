import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function VideoScreen() {
  const route = useRoute();
  const { chapter } = route.params;

  // Dummy video URL
  const videoUrl = `https://www.youtube.com/watch?v=dQw4w9WgXcQ`; // Replace with your actual video URL

  return (
    <View style={styles.container}>
      <Text style={styles.chapterTitle}>{chapter}</Text>
      <Text style={styles.videoDescription}>Watch the video for this chapter below:</Text>

      <TouchableOpacity style={styles.videoButton} onPress={() => Linking.openURL(videoUrl)}>
        <Text style={styles.videoButtonText}>Play Video</Text>
      </TouchableOpacity>

      <Text style={styles.instructions}>
        Watch the video to gain a deeper understanding of the chapter content.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03615b',
    marginBottom: 15,
  },
  videoDescription: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    color: '#555',
  },
  videoButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  videoButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
  },
});
