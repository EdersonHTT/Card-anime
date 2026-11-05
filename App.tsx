
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import ListaPaises from './src/components/List';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.titulo}>Lista de Anime</Text>

      <ListaPaises />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2563eb',
    padding: 16,
  },
});
