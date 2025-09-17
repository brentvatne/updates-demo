import { GlassContainer, GlassView } from "expo-glass-effect";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { StyleSheet, View } from "react-native";

export default function GlassContainerScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={{
          uri: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop",
        }}
      />
      <GlassContainer spacing={40} style={styles.containerStyle}>
        <GlassView
          style={styles.glass1}
          isInteractive
          glassEffectStyle="clear"
          tintColor="turquoise"
        >
          <SymbolView name="sparkle.magnifyingglass" tintColor="white" />
        </GlassView>
        <GlassView
          style={styles.glass2}
          isInteractive
          glassEffectStyle="clear"
          tintColor="skyblue"
        >
          <SymbolView name="sparkle.magnifyingglass" tintColor="white" />
        </GlassView>
        <GlassView
          style={styles.glass3}
          isInteractive
          glassEffectStyle="clear"
          tintColor="sand"
        >
          <SymbolView name="sparkle.magnifyingglass" tintColor="white" />
        </GlassView>
      </GlassContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1c1c1e", // very dark grey,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    flexDirection: "row",
  },
  glass1: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  glass2: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  glass3: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
