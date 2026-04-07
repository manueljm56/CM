import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, Fonts } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilter?: () => void;
  onSearch?: () => void;
}

export default function SearchBar({ value, onChangeText, onFilter, onSearch }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Buscar pisos..."
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
          <Ionicons name="mic-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.filterBtn} onPress={onFilter} activeOpacity={0.7}>
          <Ionicons name="options-outline" size={15} color={Colors.textPrimary} />
          <Text style={styles.filterText}>Filtros</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch} activeOpacity={0.7}>
          <Text style={styles.searchBtnText}>Buscar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    gap: Spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Fonts.sizes.md,
    color: Colors.textPrimary,
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    justifyContent: 'flex-end',
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.full,
    paddingVertical: 8,
    paddingHorizontal: Spacing.lg,
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  filterText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  searchBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.full,
    paddingVertical: 8,
    paddingHorizontal: Spacing.xl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBtnText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.white,
    fontWeight: '700',
  },
});
