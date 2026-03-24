import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Fonts } from '@/constants/theme';
import { pisos } from '@/constants/mockData';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';

export default function PortalScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const filteredPisos = pisos.filter(
    (p) =>
      search.trim() === '' ||
      p.titulo.toLowerCase().includes(search.toLowerCase()) ||
      p.ciudad.toLowerCase().includes(search.toLowerCase()) ||
      p.direccion.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PORTAL DE ANUNCIOS</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={filteredPisos}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <SearchBar
            value={search}
            onChangeText={setSearch}
          />
        }
        renderItem={({ item }) => (
          <ListingCard
            piso={item}
            onPress={() => router.push(`/anuncio/${item.id}` as any)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
  },
  menuBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 30,
  },
});
