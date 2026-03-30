import { Stack } from 'expo-router';
import 'react-native-reanimated'; // потрібне для анімацій і gesture-based navigation

export default function RootLayout() {
  return (
    <Stack>

      <Stack.Screen 
        name="index" 
        options={{ title: 'Gemini', headerShown: true }} 
      />

      <Stack.Screen 
        name="modal" 
        options={{ presentation: 'modal', title: 'Modal' }} 
      />
    </Stack>
  );
}