
import { View, Text, StyleSheet, Image } from 'react-native';

export interface Anime {
  title: {
    romaji?: string;
    english?: string;
    native?: string;
  };
  description?: string;
  coverImage?: {
    large?: string;
  };
}

interface Props {
  anime: Anime;
}

export default function Card({ anime }: Props) {
  const nameRomaji = anime.title?.romaji || anime.title?.english || 'Título indisponível';
  const nameNative = anime.title?.native || 'Nativo indisponível';
  const imageUrl = anime.coverImage?.large;
  const description = (anime.description || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim() || 'Descrição não disponível.';

  return (
    <View style={styles.card}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
      ) : null}

      <View style={styles.content}>
        <Text style={styles.name}>{nameRomaji}</Text>
        <Text style={styles.native}>{nameNative}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 14,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 220,
    backgroundColor: '#e2e8f0',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  native: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7c3aed',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
  },
});
