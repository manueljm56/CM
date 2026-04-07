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

const infoItems = [
  { label: 'Universidad', value: 'Universidad de Sevilla', icon: 'school-outline' },
  { label: 'Carrera', value: 'Ingeniería Informática', icon: 'code-slash-outline' },
  { label: 'Año', value: '3er año', icon: 'calendar-outline' },
  { label: 'Correo', value: 'maria@us.es', icon: 'mail-outline' },
];

export default function PerfilScreen() {
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
        <Text style={styles.headerTitle}>PERFIL</Text>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Avatar hero */}
      <View style={styles.heroSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/200?img=12' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
            <Ionicons name="camera" size={16} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>María García</Text>
        <Text style={styles.tagline}>Estudiante universitaria · Sevilla</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons key={star} name={star <= 4 ? 'star' : 'star-outline'} size={18} color="#FFD700" />
          ))}
          <Text style={styles.ratingText}>4.8 (12 reseñas)</Text>
        </View>
      </View>

      {/* Info cards */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información personal</Text>
        {infoItems.map((item) => (
          <View key={item.label} style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name={item.icon as any} size={20} color={Colors.primary} />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Bio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre mí</Text>
        <View style={styles.bioCard}>
          <Text style={styles.bioText}>
            Soy estudiante de 3er año de Informática en la US. Busco compañeros
            tranquilos y respetuosos para compartir piso cerca del campus.
            Me gusta mantener la casa limpia y organizada. 🏠📚
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.section, { paddingBottom: 80 }]}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsRow}>
          {[
            { label: 'Anuncios', value: '1' },
            { label: 'Favoritos', value: '3' },
            { label: 'Mensajes', value: '8' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
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
  heroSection: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  avatarContainer: { position: 'relative' },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: Colors.primary },
  cameraBtn: {
    position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.primary,
    width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: Colors.white,
  },
  name: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.textPrimary, marginTop: Spacing.sm },
  tagline: { fontSize: Fonts.sizes.md, color: Colors.textSecondary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, marginLeft: 5 },
  section: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.lg, gap: Spacing.sm },
  sectionTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  infoCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: Spacing.md, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  infoIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  infoText: { flex: 1 },
  infoLabel: { fontSize: Fonts.sizes.xs, color: Colors.textMuted, fontWeight: '500' },
  infoValue: { fontSize: Fonts.sizes.md, color: Colors.textPrimary, fontWeight: '600' },
  bioCard: {
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  bioText: { fontSize: Fonts.sizes.md, color: Colors.textSecondary, lineHeight: 24 },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.lg,
    alignItems: 'center', gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statValue: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.primary },
  statLabel: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, fontWeight: '500' },
});
