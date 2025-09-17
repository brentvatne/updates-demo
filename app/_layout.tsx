import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{ headerBlurEffect: "light", headerTransparent: true }}
    >
      <Stack.Screen name="index" options={{ title: "Updates Demo" }} />
      <Stack.Screen name="glass" options={{ title: "Glass" }} />
      <Stack.Screen
        name="glass-container"
        options={{ title: "Glass Container" }}
      />
      <Stack.Screen name="updates" options={{ title: "Updates" }} />
    </Stack>
  );
}
