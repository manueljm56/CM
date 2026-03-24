import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts } from '@/constants/theme';
import { pisos } from '@/constants/mockData';
import ListingCard from '@/components/ListingCard';

export default function FavoritosScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [favoritos, setFavoritos] = useState(pisos.filter((p) => p.favorito));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAVORITOS</Text>
        <View style={{ width: 40 }} />
      </View>

      {favoritos.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={80} color={Colors.primaryLight} />
          <Text style={styles.emptyTitle}>Sin favoritos aún</Text>
          <Text style={styles.emptySubtitle}>Guarda pisos que te gusten para verlos aquí</Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push('/portal' as any)}
            activeOpacity={0.8}
          >
            <Text style={styles.browseBtnText}>Explorar pisos</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListingCard
              piso={item}
              onPress={() => router.push(`/anuncio/${item.id}` as any)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={styles.count}>{favoritos.length} pisos guardados</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 50, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.lg, backgroundColor: Colors.background,
  },
  menuBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.textPrimary },
  listContent: { paddingBottom: 30 },
  count: {
    paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md,
    fontSize: Fonts.sizes.sm, color: Colors.textSecondary, fontWeight: '500',
  },
  emptyState: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    gap: Spacing.md, padding: Spacing.xxl,
  },
  emptyTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700', color: Colors.textPrimary },
  emptySubtitle: { fontSize: Fonts.sizes.md, color: Colors.textSecondary, textAlign: 'center' },
  browseBtn: {
    backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: Spacing.xxl,
    borderRadius: 999, marginTop: Spacing.sm,
  },
  browseBtnText: { color: Colors.white, fontWeight: '700', fontSize: Fonts.sizes.md },
});
