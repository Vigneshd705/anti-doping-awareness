import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Function to calculate number of columns based on screen width
const getColumns = (screenWidth) => {
  if (screenWidth >= 1024) return 4; // For tablets or larger screens
  if (screenWidth >= 768) return 3;  // For medium-sized screens
  return 2; // For smaller mobile screens
};

export default function ModulesScreen() {
  const navigation = useNavigation();

  // State to manage the dynamic number of columns
  const [numColumns, setNumColumns] = useState(getColumns(width));

  const categories = [
    {
      title: 'Athlete Awareness',
      modules: [
        {
          name: 'Introduction to Anti-Doping',
          progress: 0.2,
          thumbnail: require('../assets/images/Intro to anti doping.jpg'),
        },
        {
          name: 'Consequences of Doping',
          progress: 0.5,
          thumbnail: require('../assets/images/COD.jpg'),
        },
        {
          name: 'Prohibited Substances and Methods',
          progress: 0,
          thumbnail: require('../assets/images/pbs.jpg'),
        },
        {
          name: 'Therapeutic Use Exemptions (TUE)',
          progress: 0.7,
          thumbnail: require('../assets/images/TUE.jpg'),
        },
        {
          name: 'Nutrition and Supplements Awareness',
          progress: 0.1,
          thumbnail: require('../assets/images/nsa.jpg'),
        },
        {
          name: 'Psychological and Social Aspects of Doping',
          progress: 0.3,
          thumbnail: require('../assets/images/sm.jpg'),
        },
      ],
    },
    {
      title: 'Methods, Detection, and Enforcement',
      modules: [
        {
          name: 'Doping Control Officers and Roles',
          progress: 0.4,
          thumbnail: require('../assets/images/doc.jpg'),
        },
        {
          name: 'Education for Coaches and Support Staff',
          progress: 0.15,
          thumbnail: require('../assets/images/edu.jpg'),
        },
        {
          name: 'Anti-Doping Organizations and Policies',
          progress: 0.6,
          thumbnail: require('../assets/images/aop.jpg'),
        },
        {
          name: 'Technology in Anti-Doping',
          progress: 0.8,
          thumbnail: require('../assets/images/tech.jpg'),
        },
        {
          name: 'Emerging Trends in Doping and Detection',
          progress: 0.05,
          thumbnail: require('../assets/images/eme.jpg'),
        },
      ],
    },
  ];

  const renderModule = (module, index) => (
    <View key={index} style={[styles.moduleCard, { width: `${100 / numColumns}%` }]}>
      <Image source={module.thumbnail} style={styles.thumbnail} />
      <Text style={styles.moduleName} numberOfLines={2}>{module.name}</Text>

      {/* Progress bar with text inside */}
      <View style={styles.progressBarContainer}>
        <Progress.Bar
          progress={module.progress}
          width={null}
          color="#2196F3"
          height={12}
          style={styles.progressBar}
        />
        {/* Conditional text color based on progress */}
        <Text style={[styles.progressText, { color: module.progress < 0.5 ? 'black' : 'white' }]}>
          {(module.progress * 100).toFixed(0)}%
        </Text>
      </View>
    </View>
  );

  const renderCategory = (category) => (
    <View style={styles.categoryContainer} key={category.title}>
      <Text style={styles.categoryTitle}>{category.title}</Text>
      <View style={styles.modulesContainer}>
        {category.modules.map((module, index) => renderModule(module, index))}
      </View>
    </View>
  );

  useEffect(() => {
    const updateLayout = () => {
      setNumColumns(getColumns(Dimensions.get('window').width)); // Recalculate the number of columns on screen resize
    };

    // Add event listener for screen resize
    Dimensions.addEventListener('change', updateLayout);

    // Cleanup listener on unmount
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Anti-Doping Modules</Text>
          <Ionicons name="book-outline" size={30} color="white" />
        </View>

        {categories.map(renderCategory)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 100,
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: '150%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#03615b',
    padding: 10,
    borderRadius: 10,
    width: '90%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 10,
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: 'rgba(3, 97, 91, 0.1)',
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#03615b',
  },
  modulesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',  // Center the cards horizontally
    alignItems: 'center',      // Align items vertically if needed
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    borderColor: '#03615b',
    borderWidth: 1,
    aspectRatio: 1, // Ensures the card is square
    marginBottom: 15,
  },
  thumbnail: {
    width: '100%',
    height: '60%', // Ensures the image takes the full card space
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover', // Ensures image fills the container
  },
  moduleName: {
    fontSize: 14,
    color: '#03615b',
    textAlign: 'center',
    height: 40,
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  progressBar: {
    width: '90%',
    borderRadius: 7,
    backgroundColor: '#d0eae8',
  },
  progressText: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: '600',
    color: '#03615b',
  },
});
