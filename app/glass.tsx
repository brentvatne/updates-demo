import { GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

export default function GlassScreen() {
  const [incrementGlassViewsToStack, setIncrementGlassViewsToStack] =
    useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
        }}
      />

      {/* Basic Glass View */}
      <GlassView style={styles.glassView}>
        <Text style={{ color: "white", fontSize: 20 }}>Basic glass view</Text>
      </GlassView>

      {/* Glass View with clear style */}
      <Pressable
        onPress={() =>
          setIncrementGlassViewsToStack(incrementGlassViewsToStack + 1)
        }
        onLongPress={() => setIncrementGlassViewsToStack(0)}
      >
        <GlassView style={styles.clearGlassView} glassEffectStyle="clear">
          <Text style={{ color: "white", fontSize: 20 }}>Clear glass view</Text>
        </GlassView>
      </Pressable>

      {incrementGlassViewsToStack > 0 && (
        <>
          {Array.from({ length: incrementGlassViewsToStack }).map(
            (_, index) => (
              <GlassView
                key={index}
                pointerEvents="none"
                style={styles.clearGlassView}
                glassEffectStyle="clear"
              />
            ),
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e", // very dark grey,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  glassView: {
    position: "absolute",
    top: 250,
    transform: [{ translateX: "50%" }],
    width: 200,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  clearGlassView: {
    position: "absolute",
    top: 400,
    transform: [{ translateX: "50%" }],
    width: 200,
    height: 100,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
});
