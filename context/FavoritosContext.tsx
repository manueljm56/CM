import React, { createContext, useContext, useState } from 'react';
import { pisos as initialPisos } from '@/constants/mockData';

// ── Tipos ────────────────────────────────────────────────────────────────────

interface FavoritosContextType {
  /** IDs de los pisos marcados como favorito */
  favoriteIds: Set<string>;
  /** Devuelve true si el piso con ese id es favorito */
  isFavorite: (id: string) => boolean;
  /** Alterna el estado de favorito de un piso */
  toggleFavorite: (id: string) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const FavoritosContext = createContext<FavoritosContextType | null>(null);

// ── Provider ─────────────────────────────────────────────────────────────────

export function FavoritosProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos con los pisos que ya tienen favorito: true en mockData
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(initialPisos.filter((p) => p.favorito).map((p) => p.id))
  );

  const isFavorite = (id: string) => favoriteIds.has(id);

  const toggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <FavoritosContext.Provider value={{ favoriteIds, isFavorite, toggleFavorite }}>
      {children}
    </FavoritosContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useFavoritos(): FavoritosContextType {
  const ctx = useContext(FavoritosContext);
  if (!ctx) {
    throw new Error('useFavoritos debe usarse dentro de <FavoritosProvider>');
  }
  return ctx;
}
