import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { pisos } from '@/constants/mockData';

const ciudades = ['Todas', 'Sevilla', 'Madrid', 'Barcelona', 'Granada'];

export default function MapaScreen() {
  const navigation = useNavigation();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('Todas');

  const pisosFiltrados = ciudades[0] === ciudadSeleccionada
    ? pisos
    : pisos.filter((p) => p.ciudad === ciudadSeleccionada);

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
        <Text style={styles.headerTitle}>MAPA INTERACTIVO</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {ciudades.map((ciudad) => (
          <TouchableOpacity
            key={ciudad}
            style={[styles.chip, ciudadSeleccionada === ciudad && styles.chipActive]}
            onPress={() => setCiudadSeleccionada(ciudad)}
            activeOpacity={0.7}
          >
            <Text style={[styles.chipText, ciudadSeleccionada === ciudad && styles.chipTextActive]}>
              {ciudad}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={80} color={Colors.primaryLight} />
          <Text style={styles.mapTitle}>Mapa Interactivo</Text>
          <Text style={styles.mapSubtitle}>
            Aquí se mostraría el mapa con los pisos disponibles.{'\n'}
            Instala expo-maps para activar esta función.
          </Text>
        </View>

        {/* Map pins overlay */}
        {pisosFiltrados.map((piso) => (
          <View key={piso.id} style={[styles.pin, { top: (piso.lat - 37) * 500 + 100, left: (piso.lon + 6) * 300 + 50 }]}>
            <View style={styles.pinBubble}>
              <Text style={styles.pinPrice}>{piso.precio}€</Text>
            </View>
            <View style={styles.pinTail} />
          </View>
        ))}
      </View>

      {/* Listings count */}
      <View style={styles.footer}>
        <Ionicons name="home" size={18} color={Colors.primary} />
        <Text style={styles.footerText}>
          {pisosFiltrados.length} pisos disponibles
          {ciudadSeleccionada !== 'Todas' ? ` en ${ciudadSeleccionada}` : ''}
        </Text>
      </View>
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
  chips: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md, gap: Spacing.sm },
  chip: {
    paddingVertical: 7, paddingHorizontal: Spacing.lg, borderRadius: Radius.full,
    backgroundColor: Colors.white, borderWidth: 1.5, borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  chipTextActive: { color: Colors.white },
  mapContainer: {
    flex: 1, margin: Spacing.lg, borderRadius: Radius.lg, overflow: 'hidden',
    backgroundColor: Colors.white, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10, shadowRadius: 8, elevation: 4,
  },
  mapPlaceholder: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#E8F4F8', gap: Spacing.md, padding: Spacing.xl,
  },
  mapTitle: { fontSize: Fonts.sizes.xl, fontWeight: '700', color: Colors.textPrimary },
  mapSubtitle: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  pin: { position: 'absolute', alignItems: 'center' },
  pinBubble: {
    backgroundColor: Colors.primary, paddingVertical: 4, paddingHorizontal: 8,
    borderRadius: Radius.sm, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, shadowRadius: 4, elevation: 3,
  },
  pinPrice: { color: Colors.white, fontSize: Fonts.sizes.xs, fontWeight: '700' },
  pinTail: {
    width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5,
    borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent',
    borderTopColor: Colors.primary,
  },
  footer: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm,
    padding: Spacing.lg, backgroundColor: Colors.white,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  footerText: { fontSize: Fonts.sizes.md, color: Colors.textPrimary, fontWeight: '600' },
});
