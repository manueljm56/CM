import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  ScrollView,
  Switch,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import ListingCard from '@/components/ListingCard';
import SearchBar from '@/components/SearchBar';
import { usePisos } from '@/context/PisosContext';

// ── Opciones de filtro ────────────────────────────────────────────────────────

const CIUDADES = ['Todas', 'Sevilla', 'Madrid', 'Barcelona', 'Granada'];
const PRECIOS  = [
  { label: 'Sin límite', value: Infinity },
  { label: '≤ 800 €',   value: 800 },
  { label: '≤ 1.000 €', value: 1000 },
  { label: '≤ 1.200 €', value: 1200 },
  { label: '≤ 1.500 €', value: 1500 },
];
const HABITACIONES = [
  { label: 'Sin límite', value: 0 },
  { label: '1+', value: 1 },
  { label: '2+', value: 2 },
  { label: '3+', value: 3 },
  { label: '4+', value: 4 },
];

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface Filters {
  ciudad: string;
  precioMax: number;
  habitacionesMin: number;
  soloAccesible: boolean;
}

const DEFAULT_FILTERS: Filters = {
  ciudad: 'Todas',
  precioMax: Infinity,
  habitacionesMin: 0,
  soloAccesible: false,
};

function countActiveFilters(f: Filters): number {
  let n = 0;
  if (f.ciudad !== 'Todas')     n++;
  if (f.precioMax !== Infinity) n++;
  if (f.habitacionesMin > 0)    n++;
  if (f.soloAccesible)          n++;
  return n;
}

// ── Panel de filtros (Modal) ──────────────────────────────────────────────────

interface FilterPanelProps {
  visible: boolean;
  filters: Filters;
  onApply: (f: Filters) => void;
  onClose: () => void;
}

function FilterPanel({ visible, filters, onApply, onClose }: FilterPanelProps) {
  // Estado temporal dentro del modal; se aplica sólo al pulsar "Aplicar"
  const [draft, setDraft] = useState<Filters>(filters);

  const handleOpen = () => setDraft(filters); // sincroniza al abrir

  const reset = () => setDraft(DEFAULT_FILTERS);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onShow={handleOpen}
      onRequestClose={onClose}
    >
      <Pressable style={panel.backdrop} onPress={onClose} />

      <View style={panel.sheet}>
        {/* Handle */}
        <View style={panel.handle} />

        {/* Cabecera */}
        <View style={panel.header}>
          <Text style={panel.title}>Filtros</Text>
          <TouchableOpacity onPress={reset} activeOpacity={0.7}>
            <Text style={panel.reset}>Restablecer</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={panel.body}>

          {/* ── Ciudad ── */}
          <Text style={panel.sectionLabel}>Ciudad</Text>
          <View style={panel.chips}>
            {CIUDADES.map((c) => (
              <TouchableOpacity
                key={c}
                style={[panel.chip, draft.ciudad === c && panel.chipActive]}
                onPress={() => setDraft((d) => ({ ...d, ciudad: c }))}
                activeOpacity={0.7}
              >
                <Text style={[panel.chipText, draft.ciudad === c && panel.chipTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Precio máximo ── */}
          <Text style={panel.sectionLabel}>Precio máximo</Text>
          <View style={panel.chips}>
            {PRECIOS.map((p) => (
              <TouchableOpacity
                key={p.label}
                style={[panel.chip, draft.precioMax === p.value && panel.chipActive]}
                onPress={() => setDraft((d) => ({ ...d, precioMax: p.value }))}
                activeOpacity={0.7}
              >
                <Text style={[panel.chipText, draft.precioMax === p.value && panel.chipTextActive]}>
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Habitaciones mínimas ── */}
          <Text style={panel.sectionLabel}>Habitaciones mínimas</Text>
          <View style={panel.chips}>
            {HABITACIONES.map((h) => (
              <TouchableOpacity
                key={h.label}
                style={[panel.chip, draft.habitacionesMin === h.value && panel.chipActive]}
                onPress={() => setDraft((d) => ({ ...d, habitacionesMin: h.value }))}
                activeOpacity={0.7}
              >
                <Text style={[panel.chipText, draft.habitacionesMin === h.value && panel.chipTextActive]}>
                  {h.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Solo accesibles ── */}
          <View style={panel.switchRow}>
            <View>
              <Text style={panel.sectionLabel} >Sólo accesibles ♿</Text>
              <Text style={panel.sectionSub}>Pisos habilitados para minusválidos</Text>
            </View>
            <Switch
              value={draft.soloAccesible}
              onValueChange={(v) => setDraft((d) => ({ ...d, soloAccesible: v }))}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={draft.soloAccesible ? Colors.primary : '#fff'}
            />
          </View>

        </ScrollView>

        {/* Botón aplicar */}
        <TouchableOpacity
          style={panel.applyBtn}
          onPress={() => { onApply(draft); onClose(); }}
          activeOpacity={0.85}
        >
          <Text style={panel.applyText}>Aplicar filtros</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

// ── Pantalla principal ────────────────────────────────────────────────────────

export default function PortalScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const { pisos, loading, refresh } = usePisos();

  const activeCount = countActiveFilters(filters);

  const filteredPisos = pisos.filter((p) => {
    // Búsqueda por texto
    if (search.trim() !== '') {
      const q = search.toLowerCase();
      const matches =
        p.titulo.toLowerCase().includes(q) ||
        p.ciudad.toLowerCase().includes(q) ||
        p.direccion.toLowerCase().includes(q);
      if (!matches) return false;
    }
    // Ciudad
    if (filters.ciudad !== 'Todas' && p.ciudad !== filters.ciudad) return false;
    // Precio
    if (p.precio > filters.precioMax) return false;
    // Habitaciones
    if (p.habitaciones < filters.habitacionesMin) return false;
    // Accesibilidad
    if (filters.soloAccesible && !p.accesible) return false;

    return true;
  });

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

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Cargando anuncios…</Text>
        </View>
      ) : (
      <FlatList
        data={filteredPisos}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            tintColor={Colors.primary}
          />
        }
        ListHeaderComponent={
          <>
            <SearchBar
              value={search}
              onChangeText={setSearch}
              filterCount={activeCount}
              onFilter={() => setFilterOpen(true)}
            />
            {/* Chips de filtros activos */}
            {activeCount > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.activeChips}
              >
                {filters.ciudad !== 'Todas' && (
                  <ActiveChip
                    label={filters.ciudad}
                    onRemove={() => setFilters((f) => ({ ...f, ciudad: 'Todas' }))}
                  />
                )}
                {filters.precioMax !== Infinity && (
                  <ActiveChip
                    label={`≤ ${filters.precioMax}€`}
                    onRemove={() => setFilters((f) => ({ ...f, precioMax: Infinity }))}
                  />
                )}
                {filters.habitacionesMin > 0 && (
                  <ActiveChip
                    label={`${filters.habitacionesMin}+ hab.`}
                    onRemove={() => setFilters((f) => ({ ...f, habitacionesMin: 0 }))}
                  />
                )}
                {filters.soloAccesible && (
                  <ActiveChip
                    label="Accesible ♿"
                    onRemove={() => setFilters((f) => ({ ...f, soloAccesible: false }))}
                  />
                )}
              </ScrollView>
            )}
            {/* Contador de resultados */}
            <Text style={styles.resultCount}>
              {filteredPisos.length}{' '}
              {filteredPisos.length === 1 ? 'piso encontrado' : 'pisos encontrados'}
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={60} color={Colors.primaryLight} />
            <Text style={styles.emptyTitle}>Sin resultados</Text>
            <Text style={styles.emptySubtitle}>
              Prueba con otros filtros o términos de búsqueda
            </Text>
            <TouchableOpacity
              style={styles.clearBtn}
              onPress={() => { setSearch(''); setFilters(DEFAULT_FILTERS); }}
              activeOpacity={0.8}
            >
              <Text style={styles.clearBtnText}>Limpiar todo</Text>
            </TouchableOpacity>
          </View>
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
      )}

      <FilterPanel
        visible={filterOpen}
        filters={filters}
        onApply={setFilters}
        onClose={() => setFilterOpen(false)}
      />
    </View>
  );
}

// ── Chip de filtro activo ─────────────────────────────────────────────────────

function ActiveChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <View style={styles.activeChip}>
      <Text style={styles.activeChipText}>{label}</Text>
      <TouchableOpacity onPress={onRemove} hitSlop={8} activeOpacity={0.7}>
        <Ionicons name="close" size={14} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

// ── Estilos pantalla ──────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: Colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  loadingText:  { fontSize: Fonts.sizes.md, color: Colors.textSecondary },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 50, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
  },
  menuBtn:      { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle:  { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.textPrimary, letterSpacing: 0.5 },
  listContent:  { paddingBottom: 30 },
  activeChips:  { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm, gap: Spacing.sm },
  activeChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: Colors.white, borderRadius: Radius.full,
    paddingVertical: 5, paddingHorizontal: 12,
    borderWidth: 1.5, borderColor: Colors.primary,
  },
  activeChipText: { fontSize: Fonts.sizes.sm, color: Colors.primary, fontWeight: '600' },
  resultCount: {
    paddingHorizontal: Spacing.lg, paddingBottom: Spacing.sm,
    fontSize: Fonts.sizes.sm, color: Colors.textMuted, fontWeight: '500',
  },
  empty: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: Spacing.xxl, gap: Spacing.md, marginTop: 40,
  },
  emptyTitle:    { fontSize: Fonts.sizes.xl, fontWeight: '700', color: Colors.textPrimary },
  emptySubtitle: { fontSize: Fonts.sizes.md, color: Colors.textSecondary, textAlign: 'center' },
  clearBtn: {
    backgroundColor: Colors.primary, paddingVertical: 12, paddingHorizontal: Spacing.xxl,
    borderRadius: Radius.full, marginTop: Spacing.sm,
  },
  clearBtnText: { color: Colors.white, fontWeight: '700', fontSize: Fonts.sizes.md },
});

// ── Estilos panel de filtros ──────────────────────────────────────────────────

const panel = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
    paddingBottom: 34,
    maxHeight: '80%',
  },
  handle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: Colors.border,
    alignSelf: 'center', marginTop: 10, marginBottom: 4,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  title:  { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.textPrimary },
  reset:  { fontSize: Fonts.sizes.sm, color: Colors.primary, fontWeight: '600' },
  body:   { paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, gap: Spacing.sm, paddingBottom: Spacing.lg },
  sectionLabel: { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary, marginTop: Spacing.sm },
  sectionSub:   { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, marginBottom: 2 },
  chips:        { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, marginTop: 8 },
  chip: {
    paddingVertical: 7, paddingHorizontal: 16, borderRadius: Radius.full,
    backgroundColor: Colors.background, borderWidth: 1.5, borderColor: Colors.border,
  },
  chipActive:     { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText:       { fontSize: Fonts.sizes.sm, color: Colors.textSecondary, fontWeight: '600' },
  chipTextActive: { color: Colors.white },
  switchRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginTop: Spacing.sm, paddingVertical: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  applyBtn: {
    backgroundColor: Colors.primary, marginHorizontal: Spacing.xl,
    marginTop: Spacing.md, borderRadius: Radius.full,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 4,
  },
  applyText: { color: Colors.white, fontWeight: '800', fontSize: Fonts.sizes.lg },
});
