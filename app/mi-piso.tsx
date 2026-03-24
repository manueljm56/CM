import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';

const servicios = ['WiFi', 'Calefacción', 'Lavadora', 'Terraza', 'Parking'];

export default function MiPisoScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.menuBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={26} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MI PISO</Text>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&q=80' }}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.pisoTitle}>Mi Piso en Sevilla</Text>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>Activo</Text>
          </View>
        </View>

        <Text style={styles.address}>
          <Ionicons name="location-outline" size={14} color={Colors.primary} /> Avenida Reina Mercedes, 41
        </Text>

        <View style={styles.statsRow}>
          {[
            { icon: 'bed-outline', value: '4', label: 'Habitaciones' },
            { icon: 'water-outline', value: '2', label: 'Baños' },
            { icon: 'resize-outline', value: '110m²', label: 'Superficie' },
            { icon: 'people-outline', value: '2/4', label: 'Ocupado' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={20} color={Colors.primary} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Precio mensual</Text>
          <Text style={styles.precio}>1.350€ / mes</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios incluidos</Text>
          <View style={styles.serviciosList}>
            {servicios.map((s) => (
              <View key={s} style={styles.servicioChip}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                <Text style={styles.servicioText}>{s}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compañeros actuales</Text>
          <View style={styles.compañerosRow}>
            {[1, 5].map((idx) => (
              <View key={idx} style={styles.compañero}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/100?img=${idx}` }}
                  style={styles.compañeroAvatar}
                />
                <Text style={styles.compañeroName}>Compañero {idx}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.publishBtn} activeOpacity={0.8}>
          <Ionicons name="pencil-outline" size={18} color={Colors.white} />
          <Text style={styles.publishBtnText}>Editar anuncio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  heroImage: { width: '100%', height: 200 },
  content: { padding: Spacing.lg, gap: Spacing.lg },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  pisoTitle: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.textPrimary, flex: 1 },
  activeBadge: { backgroundColor: Colors.success + '22', borderRadius: Radius.full, paddingVertical: 4, paddingHorizontal: 12 },
  activeBadgeText: { color: Colors.success, fontWeight: '700', fontSize: Fonts.sizes.sm },
  address: { fontSize: Fonts.sizes.md, color: Colors.textSecondary },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statValue: { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: Fonts.sizes.xs, color: Colors.textSecondary, textAlign: 'center' },
  section: { gap: Spacing.sm },
  sectionTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', color: Colors.textPrimary },
  precio: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.primary },
  serviciosList: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  servicioChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.white,
    borderRadius: Radius.full, paddingVertical: 6, paddingHorizontal: 12,
    borderWidth: 1, borderColor: Colors.border,
  },
  servicioText: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  compañerosRow: { flexDirection: 'row', gap: Spacing.md },
  compañero: { alignItems: 'center', gap: 6 },
  compañeroAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: Colors.primaryLight },
  compañeroName: { fontSize: Fonts.sizes.xs, color: Colors.textSecondary },
  publishBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm,
    backgroundColor: Colors.primary, borderRadius: Radius.full, paddingVertical: 14,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
    marginBottom: Spacing.xl,
  },
  publishBtnText: { color: Colors.white, fontWeight: '700', fontSize: Fonts.sizes.lg },
});
