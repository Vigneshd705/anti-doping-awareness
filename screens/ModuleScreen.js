import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ModulesScreen() {
  const navigation = useNavigation();

  const modules = [
    {
      title: 'Athlete Awareness',
      thumbnail: require('../assets/images/homepic.jpg'),
      chapters: [
        'Introduction to Anti-Doping',
        'Consequences of Doping',
        'Prohibited Substances and Methods',
        'Therapeutic Use Exemptions (TUE)',
        'Nutrition and Supplements Awareness',
        'Psychological and Social Aspects of Doping',
      ],
    },
    {
      title: 'Methods, Detection, and Enforcement',
      thumbnail: require('../assets/images/homepic.jpg'),
      chapters: [
        'Doping Control Officers and Roles',
        'Education for Coaches and Support Staff',
        'Anti-Doping Organizations and Policies',
        'Technology in Anti-Doping',
        'Emerging Trends in Doping and Detection',
      ],
    },
    {
      title: 'Health and Well-Being',
      thumbnail: require('../assets/images/homepic.jpg'),
      chapters: [
        'Physical and Psychological Effects of Doping',
        'Health Risks of Prohibited Substances',
        'Rehabilitation and Recovery Strategies',
        'Safe Use of Supplements',
        'Athletic Longevity Without Doping',
      ],
    },
    {
      title: 'Education and Prevention',
      thumbnail: require('../assets/images/homepic.jpg'),
      chapters: [
        'Anti-Doping Awareness Programs',
        'Engaging Schools and Universities',
        'Resilience Against Peer Pressure',
        'Effective Communication Strategies',
        'Integrating Anti-Doping in Training',
      ],
    },
    {
      title: 'Future of Anti-Doping',
      thumbnail: require('../assets/images/homepic.jpg'),
      chapters: [
        'Emerging Doping Practices',
        'Technological Advances in Detection',
        'AI and Big Data in Anti-Doping',
        'Collaboration Across Nations',
        'The Role of Athletes in Anti-Doping Efforts',
      ],
    },
  ];

  const handleModulePress = (module) => {
    navigation.navigate('ChaptersScreen', { module });
  };

  const renderModuleCard = (module, index) => (
    <TouchableOpacity
      key={index}
      style={styles.moduleCard}
      onPress={() => handleModulePress(module)}
    >
      <Image source={module.thumbnail} style={styles.thumbnail} />
      <Text style={styles.moduleTitle}>{module.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.header}>Anti-Doping Modules</Text>
        <View style={styles.modulesContainer}>
          {modules.map((module, index) => renderModuleCard(module, index))}
        </View>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#03615b',
  },
  modulesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: '45%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    padding: 15,
  },
  thumbnail: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03615b',
    textAlign: 'center',
  },
});
