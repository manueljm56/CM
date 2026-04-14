import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { mensajes } from '@/constants/mockData';

export default function MensajesScreen() {
  const navigation = useNavigation();

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
        <Text style={styles.headerTitle}>MENSAJES</Text>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
          <Ionicons name="create-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.messageCard} activeOpacity={0.8}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              {item.noLeidos > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.noLeidos}</Text>
                </View>
              )}
            </View>
            <View style={styles.msgContent}>
              <View style={styles.msgHeader}>
                <Text style={styles.msgName}>{item.nombre}</Text>
                <Text style={styles.msgDate}>{item.fecha}</Text>
              </View>
              <Text style={styles.msgLast} numberOfLines={1}>{item.ultimo}</Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
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
  list: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  messageCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06,
    shadowRadius: 4, elevation: 2,
  },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: Colors.primaryLight },
  badge: {
    position: 'absolute', top: -2, right: -2, backgroundColor: Colors.accent,
    borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center',
  },
  badgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  msgContent: { flex: 1 },
  msgHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  msgName: { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  msgDate: { fontSize: Fonts.sizes.xs, color: Colors.textMuted },
  msgLast: { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  separator: { height: Spacing.sm },
});
