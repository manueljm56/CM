import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { usePisos } from '@/context/PisosContext';

export default function MensajesScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { pisos } = usePisos();

  // Generamos la lista de conversaciones a partir de los pisos
  const conversaciones = pisos.map((p) => ({
    pisoId: p.id,
    nombre: p.propietario.nombre,
    avatar: p.propietario.avatar,
    titulo: p.titulo,
    ciudad: p.ciudad,
  }));

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
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={conversaciones}
        keyExtractor={(item) => item.pisoId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageCard}
            activeOpacity={0.8}
            onPress={() => router.push(`/chat/${item.pisoId}` as any)}
          >
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.msgContent}>
              <View style={styles.msgHeader}>
                <Text style={styles.msgName}>{item.nombre}</Text>
                <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
              </View>
              <Text style={styles.msgSub} numberOfLines={1}>
                {item.titulo} · {item.ciudad}
              </Text>
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
    paddingTop: 50, paddingBottom: Spacing.lg, paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
  },
  menuBtn:     { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: Fonts.sizes.xl, fontWeight: '800', color: Colors.textPrimary },
  list:        { paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  messageCard: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
  },
  avatar:     { width: 52, height: 52, borderRadius: 26, borderWidth: 2, borderColor: Colors.primaryLight },
  msgContent: { flex: 1 },
  msgHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 },
  msgName:    { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  msgSub:     { fontSize: Fonts.sizes.sm, color: Colors.textSecondary },
  separator:  { height: Spacing.sm },
});
