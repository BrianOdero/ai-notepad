import { Slot, Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="loginSignup" options={{ headerShown: false }}/>
      <Stack.Screen name="onboardingScreen" options={{ headerShown: false }}/>
    </Stack>
  )
}
