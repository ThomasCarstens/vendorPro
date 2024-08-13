import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Implement your password reset logic here
    console.log('Password reset requested for:', email);
    Alert.alert(
      "Password Reset",
      "If an account exists for this email, you will receive password reset instructions.",
      [{ text: "OK", onPress: () => navigation.navigate('Login') }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Reset Password" onPress={handlePasswordReset} />
      <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PasswordResetScreen;