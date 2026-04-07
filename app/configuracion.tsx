import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';

interface SettingItemProps {
  icon: string;
  label: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (v: boolean) => void;
  onPress?: () => void;
  dangerous?: boolean;
}

function SettingItem({ icon, label, value, hasSwitch, switchValue, onSwitchChange, onPress, dangerous }: SettingItemProps) {
  return (
    <TouchableOpacity style={styles.settingItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.settingIcon, dangerous && styles.settingIconDanger]}>
        <Ionicons name={icon as any} size={20} color={dangerous ? '#FF3B30' : Colors.primary} />
      </View>
      <Text style={[styles.settingLabel, dangerous && styles.settingLabelDanger]}>{label}</Text>
      {value && <Text style={styles.settingValue}>{value}</Text>}
      {hasSwitch && (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: Colors.border, true: Colors.primaryLight }}
          thumbColor={switchValue ? Colors.primary : Colors.white}
        />
      )}
      {!hasSwitch && !value && !dangerous && (
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

export default function ConfiguracionScreen() {
  const navigation = useNavigation();
  const [notifMensajes, setNotifMensajes] = useState(true);
  const [notifNuevos, setNotifNuevos] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);

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
        <Text style={styles.headerTitle}>CONFIGURACIÓN</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Cuenta</Text>
        <View style={styles.group}>
          <SettingItem icon="person-outline" label="Editar perfil" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingItem icon="lock-closed-outline" label="Cambiar contraseña" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingItem icon="mail-outline" label="Correo electrónico" value="maria@us.es" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Notificaciones</Text>
        <View style={styles.group}>
          <SettingItem
            icon="chatbubble-outline" label="Mensajes nuevos"
            hasSwitch switchValue={notifMensajes} onSwitchChange={setNotifMensajes}
          />
          <View style={styles.divider} />
          <SettingItem
            icon="home-outline" label="Nuevos anuncios"
            hasSwitch switchValue={notifNuevos} onSwitchChange={setNotifNuevos}
          />
        </View>

        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.group}>
          <SettingItem
            icon="moon-outline" label="Modo oscuro"
            hasSwitch switchValue={modoOscuro} onSwitchChange={setModoOscuro}
          />
          <View style={styles.divider} />
          <SettingItem icon="language-outline" label="Idioma" value="Español" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Privacidad</Text>
        <View style={styles.group}>
          <SettingItem icon="eye-outline" label="Visibilidad del perfil" value="Pública" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingItem icon="document-text-outline" label="Términos y condiciones" onPress={() => {}} />
          <View style={styles.divider} />
          <SettingItem icon="shield-outline" label="Política de privacidad" onPress={() => {}} />
        </View>

        <Text style={styles.sectionTitle}>Peligroso</Text>
        <View style={styles.group}>
          <SettingItem icon="log-out-outline" label="Cerrar sesión" onPress={() => {}} dangerous />
          <View style={styles.divider} />
          <SettingItem icon="trash-outline" label="Eliminar cuenta" onPress={() => {}} dangerous />
        </View>

        <Text style={styles.version}>URF v1.0.0 · Hecho con ❤️ para estudiantes</Text>
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
  content: { padding: Spacing.lg, gap: Spacing.sm, paddingBottom: 60 },
  sectionTitle: { fontSize: Fonts.sizes.sm, fontWeight: '700', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: Spacing.md, marginBottom: 2 },
  group: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 14,
    paddingHorizontal: Spacing.lg, gap: Spacing.md,
  },
  settingIcon: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  settingIconDanger: { backgroundColor: '#FF3B3011' },
  settingLabel: { flex: 1, fontSize: Fonts.sizes.md, color: Colors.textPrimary, fontWeight: '500' },
  settingLabelDanger: { color: '#FF3B30' },
  settingValue: { fontSize: Fonts.sizes.sm, color: Colors.textMuted },
  divider: { height: 1, backgroundColor: Colors.border, marginLeft: 68 },
  version: { textAlign: 'center', fontSize: Fonts.sizes.xs, color: Colors.textMuted, paddingTop: Spacing.lg },
});
