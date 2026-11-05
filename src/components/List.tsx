
import {
  Text,
  FlatList,
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import Card, { Anime } from './Card';
import { Animes } from '../services/api';
import { useEffect, useState } from 'react';

export default function List() {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro('');
        const dados = await Animes('');
        setAnimes(Array.isArray(dados) ? dados : []);
      } catch (error) {
        console.log(error);
        setErro('Não foi possível carregar os animes.');
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  const animesFiltrados = animes.filter((anime) => {
    const nome = (
      anime.title?.romaji ??  
      ''
    ).toLowerCase();

    return nome.includes(busca.trim().toLowerCase());
  });

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" />
        <Text>Carregando animes...</Text>
      </View>
    );
  }

  if (erro) {
    return <Text style={styles.erro}>{erro}</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar anime..."
        value={busca}
        onChangeText={setBusca}
        autoCapitalize="none"
      />

      <FlatList
        data={animesFiltrados}
        keyExtractor={(item, index) =>
          item.title?.romaji ?? item.title?.english ?? item.title?.native ?? index.toString()
        }
        renderItem={({ item }) => <Card anime={item} />}
        ListEmptyComponent={
          <Text style={styles.mensagem}>
            Nenhum anime encontrado.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  mensagem: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  erro: {
    padding: 20,
    textAlign: 'center',
  },
});
