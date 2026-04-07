export interface Piso {
  id: string;
  titulo: string;
  ciudad: string;
  direccion: string;
  personas: number;
  personasOcupadas: number;
  accesible: boolean;
  precio: number;
  imagen: string;
  descripcion: string;
  habitaciones: number;
  banos: number;
  metros: number;
  universidad: string;
  distanciaUniversidad: string;
  servicios: string[];
  propietario: {
    nombre: string;
    avatar: string;
    rating: number;
  };
  favorito: boolean;
  fechaPublicacion: string;
  lat: number;
  lon: number;
}

export const pisos: Piso[] = [
  {
    id: '1',
    titulo: 'Piso en Sevilla',
    ciudad: 'Sevilla',
    direccion: 'Avenida Reina Mercedes, 41',
    personas: 4,
    personasOcupadas: 2,
    accesible: true,
    precio: 1350,
    imagen: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=400&q=80',
    descripcion: 'Amplio piso de 4 habitaciones cerca de la Universidad de Sevilla. Totalmente amueblado, con cocina equipada y salón espacioso. Ideal para estudiantes universitarios.',
    habitaciones: 4,
    banos: 2,
    metros: 110,
    universidad: 'Universidad de Sevilla',
    distanciaUniversidad: '5 min a pie',
    servicios: ['WiFi', 'Calefacción', 'Aire acondicionado', 'Lavadora', 'Parking'],
    propietario: { nombre: 'Carlos García', avatar: 'https://i.pravatar.cc/100?img=1', rating: 4.8 },
    favorito: true,
    fechaPublicacion: '2026-03-10',
    lat: 37.3564,
    lon: -5.9863,
  },
  {
    id: '2',
    titulo: 'Piso en Sevilla',
    ciudad: 'Sevilla',
    direccion: 'Calle Luis Montoto, 82',
    personas: 3,
    personasOcupadas: 1,
    accesible: true,
    precio: 990,
    imagen: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80',
    descripcion: 'Bonito piso reformado a 10 minutos de la Facultad de Medicina. Habitaciones individuales con armario empotrado. Zona tranquila con todos los servicios cerca.',
    habitaciones: 3,
    banos: 1,
    metros: 85,
    universidad: 'Universidad de Sevilla',
    distanciaUniversidad: '10 min en metro',
    servicios: ['WiFi', 'Calefacción', 'Lavadora', 'Terraza'],
    propietario: { nombre: 'Ana Martínez', avatar: 'https://i.pravatar.cc/100?img=5', rating: 4.6 },
    favorito: false,
    fechaPublicacion: '2026-03-12',
    lat: 37.3814,
    lon: -5.9634,
  },
  {
    id: '3',
    titulo: 'Piso en Madrid',
    ciudad: 'Madrid',
    direccion: 'Calle Alcalá, 125',
    personas: 5,
    personasOcupadas: 3,
    accesible: false,
    precio: 1600,
    imagen: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    descripcion: 'Espacioso piso en el centro de Madrid. Cerca del metro Goya. Perfecto para estudiantes de la Complutense o la UAM. Salón grande con sofá y televisión.',
    habitaciones: 5,
    banos: 2,
    metros: 130,
    universidad: 'Universidad Complutense de Madrid',
    distanciaUniversidad: '15 min en metro',
    servicios: ['WiFi', 'Calefacción', 'Aire acondicionado', 'Lavadora', 'Lavavajillas'],
    propietario: { nombre: 'Pedro Sánchez', avatar: 'https://i.pravatar.cc/100?img=3', rating: 4.2 },
    favorito: true,
    fechaPublicacion: '2026-03-08',
    lat: 40.4168,
    lon: -3.6830,
  },
  {
    id: '4',
    titulo: 'Piso en Barcelona',
    ciudad: 'Barcelona',
    direccion: 'Carrer de Muntaner, 52',
    personas: 3,
    personasOcupadas: 2,
    accesible: false,
    precio: 1200,
    imagen: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
    descripcion: 'Moderno piso en el Eixample de Barcelona con mucha luz natural. A 5 minutos de la UB. Habitaciones con escritorio y estantería. Ambiente estudiantil y tranquilo.',
    habitaciones: 3,
    banos: 1,
    metros: 80,
    universidad: 'Universitat de Barcelona',
    distanciaUniversidad: '5 min en bici',
    servicios: ['WiFi', 'Aire acondicionado', 'Lavadora', 'Balcón'],
    propietario: { nombre: 'Laura Puig', avatar: 'https://i.pravatar.cc/100?img=9', rating: 4.9 },
    favorito: false,
    fechaPublicacion: '2026-03-14',
    lat: 41.3851,
    lon: 2.1734,
  },
  {
    id: '5',
    titulo: 'Piso en Granada',
    ciudad: 'Granada',
    direccion: 'Calle Gran Vía de Colón, 7',
    personas: 4,
    personasOcupadas: 1,
    accesible: true,
    precio: 800,
    imagen: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    descripcion: 'Acogedor piso en el centro histórico de Granada, a 5 min de la UGR. Vistas espectaculares a la Alhambra. Zona de teterías y bares de tapas a la vuelta de la esquina.',
    habitaciones: 4,
    banos: 2,
    metros: 95,
    universidad: 'Universidad de Granada',
    distanciaUniversidad: '5 min a pie',
    servicios: ['WiFi', 'Calefacción', 'Lavadora', 'Vistas Alhambra'],
    propietario: { nombre: 'María López', avatar: 'https://i.pravatar.cc/100?img=7', rating: 4.7 },
    favorito: true,
    fechaPublicacion: '2026-03-15',
    lat: 37.1759,
    lon: -3.5985,
  },
];

export const mensajes = [
  {
    id: '1',
    nombre: 'Carlos García',
    avatar: 'https://i.pravatar.cc/100?img=1',
    ultimo: 'Hola, ¿el piso sigue disponible?',
    fecha: '17:30',
    noLeidos: 2,
    pisoId: '1',
  },
  {
    id: '2',
    nombre: 'Ana Martínez',
    avatar: 'https://i.pravatar.cc/100?img=5',
    ultimo: 'Perfecto, quedamos el lunes',
    fecha: 'Ayer',
    noLeidos: 0,
    pisoId: '2',
  },
  {
    id: '3',
    nombre: 'Laura Puig',
    avatar: 'https://i.pravatar.cc/100?img=9',
    ultimo: '¿Puedes darme más fotos?',
    fecha: 'Mar',
    noLeidos: 1,
    pisoId: '4',
  },
];
