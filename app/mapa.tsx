import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { usePisos } from '@/context/PisosContext';

const ciudades = ['Todas', 'Sevilla', 'Madrid', 'Barcelona', 'Granada'];

// ── Mapa Leaflet (OpenStreetMap — gratuito, sin API Key) ──────────────────────

function buildMapHTML(pisosData: Piso[]): string {
  const centerLat =
    pisosData.length > 0
      ? pisosData.reduce((s, p) => s + p.lat, 0) / pisosData.length
      : 40.4;
  const centerLon =
    pisosData.length > 0
      ? pisosData.reduce((s, p) => s + p.lon, 0) / pisosData.length
      : -3.7;
  const zoom = pisosData.length === 1 ? 15 : pisosData.length <= 3 ? 8 : 6;

  const markersJS = pisosData
    .map((p) => {
      const titulo = p.titulo.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const direccion = p.direccion.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      const universidad = p.universidad.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
      return `
    (function() {
      var icon = L.divIcon({
        className: '',
        html: '<div style="background:#5BBFBF;color:#fff;font-size:12px;font-weight:700;padding:5px 11px;border-radius:8px;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:2px solid #3A9B9B">${p.precio}\u20AC</div>',
        iconAnchor: [28, 14],
      });
      L.marker([${p.lat}, ${p.lon}], { icon: icon })
        .addTo(map)
        .bindPopup(
          '<div style="font-family:-apple-system,sans-serif;min-width:170px;padding:2px">' +
            '<b style="font-size:14px;color:#1C1C1E">${titulo}</b><br>' +
            '<span style="color:#6C6C70;font-size:12px">${direccion}</span><br><br>' +
            '<span style="color:#5BBFBF;font-weight:700;font-size:16px">${p.precio}\u20AC/mes</span><br>' +
            '<span style="color:#9A9A9E;font-size:11px;display:block;margin-top:4px">\ud83c\udfeb ${universidad}</span>' +
            '<span style="color:#9A9A9E;font-size:11px">\ud83d\udeb6 ${p.distanciaUniversidad}</span>' +
          '</div>',
          { maxWidth: 260 }
        );
    })();`;
    })
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body,#map{width:100%;height:100%}
    .leaflet-popup-content-wrapper{border-radius:14px!important;box-shadow:0 4px 16px rgba(0,0,0,0.15)!important}
    .leaflet-popup-content{margin:14px 16px!important}
    .leaflet-popup-tip-container{display:none}
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    var map = L.map('map', { zoomControl: true }).setView([${centerLat}, ${centerLon}], ${zoom});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '\u00a9 <a href="https://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    ${markersJS}
  <\/script>
</body>
</html>`;
}

function MapaLeaflet({ pisos: pisosData }: { pisos: Piso[] }) {
  return (
    <WebView
      key={pisosData.map((p) => p.id).join(',')}
      source={{ html: buildMapHTML(pisosData) }}
      style={{ flex: 1 }}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      renderLoading={() => (
        <View style={loadingStyles.wrap}>
          <Ionicons name="map-outline" size={48} color={Colors.primaryLight} />
          <Text style={loadingStyles.text}>Cargando mapa…</Text>
        </View>
      )}
    />
  );
}

// ── Pantalla principal ────────────────────────────────────────────────────────

export default function MapaScreen() {
  const navigation = useNavigation();
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState('Todas');
  const { pisos } = usePisos();

  const pisosFiltrados =
    ciudadSeleccionada === 'Todas'
      ? pisos
      : pisos.filter((p) => p.ciudad === ciudadSeleccionada);

  return (
    <View style={styles.container}>
      {/* Header */}
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

      {/* Filtros de ciudad */}
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
            <Text
              style={[styles.chipText, ciudadSeleccionada === ciudad && styles.chipTextActive]}
            >
              {ciudad}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Mapa interactivo */}
      <View style={styles.mapContainer}>
        <MapaLeaflet pisos={pisosFiltrados} />
      </View>

      {/* Footer contador */}
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

// ── Estilos ──────────────────────────────────────────────────────────────────

const loadingStyles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#E8F4F8',
  },
  text: { fontSize: Fonts.sizes.md, color: Colors.textSecondary },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
  },
  menuBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  chips: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.md, gap: Spacing.sm },
  chip: {
    paddingVertical: 7,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.full,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: { color: Colors.white },
  mapContainer: {
    flex: 1,
    marginHorizontal: Spacing.lg,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  footerText: {
    fontSize: Fonts.sizes.md,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
});
