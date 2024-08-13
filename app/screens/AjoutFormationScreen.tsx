import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AjoutFormationScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    // In a real app, you would send this data to your backend
    console.log({ title, description, date, duration, location });
    // Navigate back or show a success message
    navigation.goBack();
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ajouter une Formation</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Titre de la formation</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Entrez le titre"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Entrez la description"
          multiline
          numberOfLines={4}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
      </View>
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

export default AjoutFormationScreen;