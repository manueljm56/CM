import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { pisos } from '@/constants/mockData';

export default function AnuncioDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const piso = pisos.find((p) => p.id === id);
  const [favorito, setFavorito] = useState(piso?.favorito ?? false);

  if (!piso) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={60} color={Colors.primaryLight} />
        <Text style={styles.notFoundText}>Anuncio no encontrado</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: piso.imagen }} style={styles.heroImage} resizeMode="cover" />
          <TouchableOpacity style={styles.backCircle} onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heartCircle}
            onPress={() => setFavorito(!favorito)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={favorito ? 'heart' : 'heart-outline'}
              size={22}
              color={favorito ? Colors.accent : Colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Title & price */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{piso.titulo.toUpperCase()}</Text>
            <Text style={styles.price}>{piso.precio}€/mes</Text>
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.address}>{piso.direccion}</Text>
          </View>

          {/* Stats row */}
          <View style={styles.statsRow}>
            {[
              { icon: 'bed-outline', value: `${piso.habitaciones}`, label: 'Hab.' },
              { icon: 'water-outline', value: `${piso.banos}`, label: 'Baños' },
              { icon: 'resize-outline', value: `${piso.metros}m²`, label: 'Área' },
              { icon: 'people-outline', value: `${piso.personas}`, label: 'Personas' },
            ].map((s) => (
              <View key={s.label} style={styles.statCard}>
                <Ionicons name={s.icon as any} size={20} color={Colors.primary} />
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>

          {/* Accessibility */}
          {piso.accesible && (
            <View style={styles.accessBadge}>
              <Ionicons name="accessibility" size={16} color={Colors.primary} />
              <Text style={styles.accessText}>Piso habilitado para minusválidos</Text>
            </View>
          )}

          {/* University */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Universidad cercana</Text>
            <View style={styles.uniRow}>
              <Ionicons name="school-outline" size={20} color={Colors.primary} />
              <View>
                <Text style={styles.uniName}>{piso.universidad}</Text>
                <Text style={styles.uniDistance}>{piso.distanciaUniversidad}</Text>
              </View>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{piso.descripcion}</Text>
          </View>

          {/* Services */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Servicios</Text>
            <View style={styles.serviciosList}>
              {piso.servicios.map((s) => (
                <View key={s} style={styles.servicioChip}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.primary} />
                  <Text style={styles.servicioText}>{s}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Propietario */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Propietario</Text>
            <View style={styles.ownerCard}>
              <Image source={{ uri: piso.propietario.avatar }} style={styles.ownerAvatar} />
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{piso.propietario.nombre}</Text>
                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.round(piso.propietario.rating) ? 'star' : 'star-outline'}
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                  <Text style={styles.ratingText}>{piso.propietario.rating}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.msgBtn} activeOpacity={0.8}>
                <Ionicons name="chatbubble-outline" size={18} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomPrice}>{piso.precio}€</Text>
          <Text style={styles.bottomLabel}>por mes</Text>
        </View>
        <TouchableOpacity style={styles.contactBtn} activeOpacity={0.85}>
          <Ionicons name="mail-outline" size={18} color={Colors.white} />
          <Text style={styles.contactBtnText}>Contactar propietario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  notFoundText: { fontSize: Fonts.sizes.lg, color: Colors.textSecondary },
  backBtn: { backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 24, borderRadius: Radius.full },
  backBtnText: { color: Colors.white, fontWeight: '700' },
  imageContainer: { position: 'relative' },
  heroImage: { width: '100%', height: 260 },
  backCircle: {
    position: 'absolute', top: 50, left: Spacing.lg, width: 40, height: 40,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
  heartCircle: {
    position: 'absolute', top: 50, right: Spacing.lg, width: 40, height: 40,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 3,
  },
  content: { padding: Spacing.lg, gap: Spacing.lg },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.textPrimary, flex: 1 },
  price: { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.primary },
  addressRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  address: { fontSize: Fonts.sizes.md, color: Colors.textSecondary },
  statsRow: { flexDirection: 'row', gap: Spacing.sm },
  statCard: {
    flex: 1, backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    alignItems: 'center', gap: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  statValue: { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  statLabel: { fontSize: Fonts.sizes.xs, color: Colors.textSecondary },
  accessBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.primaryLight + '44',
    borderRadius: Radius.full, paddingVertical: 8, paddingHorizontal: 14, alignSelf: 'flex-start',
  },
  accessText: { fontSize: Fonts.sizes.sm, color: Colors.primaryDark, fontWeight: '600' },
  section: { gap: 8 },
  sectionTitle: { fontSize: Fonts.sizes.lg, fontWeight: '700', color: Colors.textPrimary },
  uniRow: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: Spacing.md, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  uniName: { fontSize: Fonts.sizes.md, fontWeight: '600', color: Colors.textPrimary },
  uniDistance: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  description: { fontSize: Fonts.sizes.md, color: Colors.textSecondary, lineHeight: 24 },
  serviciosList: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  servicioChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: Colors.white,
    borderRadius: Radius.full, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: Colors.border,
  },
  servicioText: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  ownerCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md, backgroundColor: Colors.white,
    borderRadius: Radius.md, padding: Spacing.md, shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  ownerAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: Colors.primaryLight },
  ownerInfo: { flex: 1 },
  ownerName: { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 2 },
  ratingText: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, marginLeft: 4 },
  msgBtn: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: Colors.white,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md, paddingBottom: 28,
    borderTopWidth: 1, borderTopColor: Colors.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 8,
  },
  bottomPrice: { fontSize: Fonts.sizes.xxl, fontWeight: '800', color: Colors.textPrimary },
  bottomLabel: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  contactBtn: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, backgroundColor: Colors.primary,
    borderRadius: Radius.full, paddingVertical: 14, paddingHorizontal: Spacing.xl,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  contactBtnText: { color: Colors.white, fontWeight: '700', fontSize: Fonts.sizes.md },
});
