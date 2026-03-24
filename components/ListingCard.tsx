import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Colors, Spacing, Radius, Fonts } from '@/constants/theme';
import { Piso } from '@/constants/mockData';

interface ListingCardProps {
  piso: Piso;
  onPress: () => void;
}

export default function ListingCard({ piso, onPress }: ListingCardProps) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: piso.imagen }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title}>{piso.titulo.toUpperCase()}</Text>
        <Text style={styles.address}>{piso.direccion}</Text>
        <Text style={styles.detail}>{piso.personas} personas</Text>
        {piso.accesible && (
          <Text style={styles.accessible}>Piso habilitado para minusválidos</Text>
        )}
        <Text style={styles.price}>{piso.precio}€</Text>
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Ver anuncio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 130,
    height: 160,
    borderTopLeftRadius: Radius.lg,
    borderBottomLeftRadius: Radius.lg,
  },
  info: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'center',
    gap: 3,
  },
  title: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    letterSpacing: 0.3,
  },
  address: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  detail: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textSecondary,
  },
  accessible: {
    fontSize: Fonts.sizes.xs,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: Fonts.sizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  button: {
    marginTop: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: Colors.primary,
    fontSize: Fonts.sizes.sm,
    fontWeight: '600',
  },
});
