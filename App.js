import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { f, database, auth } from './config/config.js';
import Screen from './Components/Authentication/Screen';

export default function App() {
  return (
    <Screen></Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
