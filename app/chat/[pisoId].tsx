import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Fonts, Radius } from '@/constants/theme';
import { chatMensajes, ChatMensaje } from '@/constants/mockData';
import { usePisos } from '@/context/PisosContext';

export default function ChatScreen() {
  const { pisoId } = useLocalSearchParams<{ pisoId: string }>();
  const router = useRouter();
  const { pisos } = usePisos();
  const piso = pisos.find((p) => p.id === pisoId);
  const propietario = piso?.propietario;

  const initialMessages = chatMensajes[pisoId ?? ''] ?? [];
  const [messages, setMessages] = useState<ChatMensaje[]>(initialMessages);
  const [texto, setTexto] = useState('');
  const listRef = useRef<FlatList>(null);

  const enviar = () => {
    const trimmed = texto.trim();
    if (!trimmed) return;
    const nuevo: ChatMensaje = {
      id: String(Date.now()),
      texto: trimmed,
      propio: true,
      hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, nuevo]);
    setTexto('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  if (!piso || !propietario) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={60} color={Colors.primaryLight} />
        <Text style={styles.notFoundText}>Conversación no encontrada</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backCircle} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Image source={{ uri: propietario.avatar }} style={styles.headerAvatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{propietario.nombre}</Text>
          <Text style={styles.headerPiso} numberOfLines={1}>{piso.titulo} · {piso.ciudad}</Text>
        </View>
        <TouchableOpacity
          style={styles.pisoBtn}
          onPress={() => router.push(`/anuncio/${piso.id}` as any)}
          activeOpacity={0.7}
        >
          <Ionicons name="home-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Mensajes */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        showsVerticalScrollIndicator={false}
        onLayout={() => listRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.propio ? styles.bubbleOwn : styles.bubbleOther]}>
            {!item.propio && (
              <Image source={{ uri: propietario.avatar }} style={styles.bubbleAvatar} />
            )}
            <View style={[styles.bubbleContent, item.propio ? styles.bubbleContentOwn : styles.bubbleContentOther]}>
              <Text style={[styles.bubbleText, item.propio && styles.bubbleTextOwn]}>
                {item.texto}
              </Text>
              <Text style={[styles.bubbleTime, item.propio && styles.bubbleTimeOwn]}>
                {item.hora}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Input */}
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje…"
          placeholderTextColor={Colors.textMuted}
          value={texto}
          onChangeText={setTexto}
          multiline
          maxLength={500}
          onSubmitEditing={enviar}
        />
        <TouchableOpacity
          style={[styles.sendBtn, !texto.trim() && styles.sendBtnDisabled]}
          onPress={enviar}
          activeOpacity={0.8}
          disabled={!texto.trim()}
        >
          <Ionicons name="send" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: Colors.background },
  notFound:      { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Spacing.md },
  notFoundText:  { fontSize: Fonts.sizes.lg, color: Colors.textSecondary },
  backBtn:       { backgroundColor: Colors.primary, paddingVertical: 10, paddingHorizontal: 24, borderRadius: Radius.full },
  backBtnText:   { color: Colors.white, fontWeight: '700' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', gap: Spacing.md,
    paddingTop: 50, paddingBottom: Spacing.md, paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06, shadowRadius: 4, elevation: 3,
  },
  backCircle:   { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  headerAvatar: { width: 42, height: 42, borderRadius: 21, borderWidth: 2, borderColor: Colors.primaryLight },
  headerInfo:   { flex: 1 },
  headerName:   { fontSize: Fonts.sizes.md, fontWeight: '700', color: Colors.textPrimary },
  headerPiso:   { fontSize: Fonts.sizes.xs, color: Colors.textSecondary },
  pisoBtn:      { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },

  // Mensajes
  messageList:  { paddingHorizontal: Spacing.md, paddingVertical: Spacing.lg, gap: Spacing.sm },
  bubble: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 8, marginBottom: 4,
  },
  bubbleOwn:   { justifyContent: 'flex-end' },
  bubbleOther: { justifyContent: 'flex-start' },
  bubbleAvatar: { width: 28, height: 28, borderRadius: 14, marginBottom: 2 },
  bubbleContent: {
    maxWidth: '75%', borderRadius: Radius.lg, paddingVertical: 10, paddingHorizontal: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06,
    shadowRadius: 3, elevation: 1,
  },
  bubbleContentOwn:   { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleContentOther: { backgroundColor: Colors.white, borderBottomLeftRadius: 4 },
  bubbleText:     { fontSize: Fonts.sizes.md, color: Colors.textPrimary, lineHeight: 22 },
  bubbleTextOwn:  { color: Colors.white },
  bubbleTime:     { fontSize: 10, color: Colors.textMuted, marginTop: 4, alignSelf: 'flex-end' },
  bubbleTimeOwn:  { color: 'rgba(255,255,255,0.7)' },

  // Input bar
  inputBar: {
    flexDirection: 'row', alignItems: 'flex-end', gap: Spacing.sm,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.md, paddingBottom: 28,
    backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, backgroundColor: Colors.background, borderRadius: Radius.xl,
    paddingHorizontal: Spacing.md, paddingVertical: 10,
    fontSize: Fonts.sizes.md, color: Colors.textPrimary,
    maxHeight: 120, borderWidth: 1, borderColor: Colors.border,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, shadowRadius: 4, elevation: 3,
  },
  sendBtnDisabled: { backgroundColor: Colors.border, shadowOpacity: 0 },
});
