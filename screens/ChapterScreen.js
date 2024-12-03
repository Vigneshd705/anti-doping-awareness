import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ChaptersScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { module } = route.params;

  const handleChapterPress = (chapter) => {
    navigation.navigate('VideoScreen', { chapter });
  };

  const handleQuizPress = (chapter) => {
    navigation.navigate('QuizScreen', { chapter });
  };

  const handleModuleQuizPress = () => {
    navigation.navigate('ModuleQuizScreen', { module });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Module Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.moduleTitle}>{module.title}</Text>
          <Text style={styles.moduleDescription}>
            This module explores the key aspects of "{module.title}" with detailed chapters covering critical insights and practical knowledge.
          </Text>
        </View>

        {/* Chapters List */}
        {module.chapters.map((chapter, index) => (
          <View key={index} style={styles.chapterCard}>
            <Image
              source={module.thumbnail} // Use the same module thumbnail for simplicity
              style={styles.chapterImage}
            />
            <View style={styles.chapterContent}>
              <Text style={styles.chapterTitle}>{chapter}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={[styles.button, styles.videoButton]}
                  onPress={() => handleChapterPress(chapter)}
                >
                  <Text style={styles.buttonText}>Watch Video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.quizButton]}
                  onPress={() => handleQuizPress(chapter)}
                >
                  <Text style={styles.buttonText}>Take Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {/* Module Quiz Button */}
        <TouchableOpacity
          style={styles.moduleQuizButton}
          onPress={handleModuleQuizPress}
        >
          <Text style={styles.moduleQuizButtonText}>Take Module Quiz</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollView: {
    padding: 20,
    alignItems: 'center',
  },
  descriptionContainer: {
    marginBottom: 20,
    width: '100%',
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  moduleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03615b',
    marginBottom: 10,
  },
  moduleDescription: {
    fontSize: 16,
    color: '#555',
  },
  chapterCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  chapterImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#03615b',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    elevation: 3,
  },
  videoButton: {
    backgroundColor: '#2196F3',
  },
  quizButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  moduleQuizButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  moduleQuizButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});