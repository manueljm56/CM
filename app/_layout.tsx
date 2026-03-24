import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';
import DrawerContent from '@/components/DrawerContent';

export const unstable_settings = {
  anchor: 'portal',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            headerShown: false,
            drawerStyle: {
              width: 260,
            },
          }}
        >
          <Drawer.Screen name="portal" options={{ title: 'Portal de Anuncios' }} />
          <Drawer.Screen name="mensajes" options={{ title: 'Mensajes' }} />
          <Drawer.Screen name="mapa" options={{ title: 'Mapa Interactivo' }} />
          <Drawer.Screen name="favoritos" options={{ title: 'Favoritos' }} />
          <Drawer.Screen name="mi-piso" options={{ title: 'Mi Piso' }} />
          <Drawer.Screen name="perfil" options={{ title: 'Perfil' }} />
          <Drawer.Screen name="configuracion" options={{ title: 'Configuración' }} />
          <Drawer.Screen name="anuncio/[id]" options={{ title: 'Detalle de Anuncio' }} />
        </Drawer>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
