import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabaseConfigured, fetchPisos } from '@/lib/supabase';
import { pisos as mockPisos, Piso } from '@/constants/mockData';

// ── Tipos ─────────────────────────────────────────────────────────────────────

interface PisosContextType {
  pisos: Piso[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────

const PisosContext = createContext<PisosContextType | null>(null);

// ── Función de mapeo: snake_case (Supabase) → camelCase (TypeScript) ──────────

function mapRow(row: Record<string, any>): Piso {
  return {
    id:                   String(row.id),
    titulo:               row.titulo,
    ciudad:               row.ciudad,
    direccion:            row.direccion,
    personas:             row.personas,
    personasOcupadas:     row.personas_ocupadas ?? 0,
    accesible:            row.accesible ?? false,
    precio:               row.precio,
    imagen:               row.imagen ?? '',
    descripcion:          row.descripcion ?? '',
    habitaciones:         row.habitaciones,
    banos:                row.banos,
    metros:               row.metros,
    universidad:          row.universidad ?? '',
    distanciaUniversidad: row.distancia_universidad ?? '',
    servicios:            row.servicios ?? [],
    propietario:          row.propietario ?? { nombre: '', avatar: '', rating: 0 },
    favorito:             row.favorito ?? false,
    fechaPublicacion:     row.fecha_publicacion ?? '',
    lat:                  row.lat ?? 0,
    lon:                  row.lon ?? 0,
  };
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function PisosProvider({ children }: { children: React.ReactNode }) {
  const [pisos, setPisos]     = useState<Piso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const loadPisos = async () => {
    setLoading(true);
    setError(null);

    // Si Supabase no está configurado → usar mockData directamente
    if (!supabaseConfigured) {
      console.log('[PisosContext] Supabase no configurado → usando mockData');
      setPisos(mockPisos);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchPisos();
      setPisos(data.map(mapRow));
    } catch (err: any) {
      console.error('[PisosContext] Error al cargar pisos:', err.message);
      setError(err.message);
      // Fallback a mockData si hay error de red
      setPisos(mockPisos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPisos();
  }, []);

  return (
    <PisosContext.Provider value={{ pisos, loading, error, refresh: loadPisos }}>
      {children}
    </PisosContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePisos(): PisosContextType {
  const ctx = useContext(PisosContext);
  if (!ctx) throw new Error('usePisos debe usarse dentro de <PisosProvider>');
  return ctx;
}
