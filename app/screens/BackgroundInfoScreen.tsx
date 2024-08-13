import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';

const BackgroundInfoScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Our App</Text>
      <Text style={styles.paragraph}>
        Welcome to our medical education platform! This app is designed to connect healthcare
        professionals with educational resources and training opportunities.
      </Text>
      <Text style={styles.subtitle}>Key Features:</Text>
      <Text style={styles.feature}>• Browse and search for medical training courses</Text>
      <Text style={styles.feature}>• Create and manage your professional profile</Text>
      <Text style={styles.feature}>• Receive notifications about new courses and updates</Text>
      <Text style={styles.feature}>• For qualified users: Create and manage your own training courses</Text>
      <Text style={styles.paragraph}>
        Our platform is committed to providing high-quality, up-to-date medical education to
        healthcare professionals across various specialties.
      </Text>
      <Text style={styles.paragraph}>
        Get started by creating an account or logging in if you're already a member!
      </Text>
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
  feature: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default BackgroundInfoScreen;