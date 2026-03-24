import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { usePathname, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';

const menuItems = [
  { label: 'Portal de anuncios', icon: 'home-outline', route: '/portal' },
  { label: 'Mensajes', icon: 'mail-outline', route: '/mensajes' },
  { label: 'Mapa interactivo', icon: 'location-outline', route: '/mapa' },
  { label: 'Favoritos', icon: 'heart-outline', route: '/favoritos' },
  { label: 'Mi piso', icon: 'people-outline', route: '/mi-piso' },
  { label: 'Perfil', icon: 'person-circle-outline', route: '/perfil', isProfile: true },
  { label: 'Configuración', icon: 'settings-outline', route: '/configuracion' },
];

export default function DrawerContent(props: any) {
  const pathname = usePathname();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Ionicons name="home" size={22} color={Colors.primary} />
        </View>
        <Text style={styles.logoText}>URF</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Menu items */}
      <View style={styles.menu}>
        {menuItems.map((item) => {
          const isActive = pathname === item.route || (pathname === '/' && item.route === '/portal');
          return (
            <TouchableOpacity
              key={item.route}
              style={[styles.menuItem, isActive && styles.menuItemActive]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              {item.isProfile ? (
                <Image
                  source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                  style={styles.avatar}
                />
              ) : (
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={isActive ? Colors.primaryDark : Colors.textSecondary}
                />
              )}
              <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.drawerBg,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  logoText: {
    fontSize: Fonts.sizes.xl,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  menu: {
    paddingHorizontal: Spacing.md,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.md,
  },
  menuItemActive: {
    backgroundColor: Colors.drawerActive,
  },
  menuLabel: {
    fontSize: Fonts.sizes.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  menuLabelActive: {
    color: Colors.drawerActiveText,
    fontWeight: '700',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
});
