import {
  Button,
  Form,
  Host,
  HStack,
  Image,
  Section,
  Spacer,
  Switch,
  Text,
} from "@expo/ui/swift-ui";
import { background, clipShape, frame } from "@expo/ui/swift-ui/modifiers";
import { Image as ExpoImage } from "expo-image";
import { Link } from "expo-router";
import 'expo-sqlite/localStorage/install';
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function IndexScreen() {
  const [isLiveStreamMode, setIsLiveStreamMode] = useState(
    localStorage.getItem("isLiveStreamMode") === "true",
  );

  useEffect(() => {
    // if (isLiveStreamMode) {
    //   setTimeout(() => {
    //     throw new Error("Oh no something went wrong");
    //   }, 1000);
    // }

    localStorage.setItem("isLiveStreamMode", isLiveStreamMode.toString());
  }, [isLiveStreamMode]);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      automaticallyAdjustContentInsets
      contentInsetAdjustmentBehavior="automatic"
    >
      <ExpoImage
        source={require("../assets/images/livestream.png")}
        style={{ width: "100%", height: 200 }}
      />
      <Host style={{ flex: 1 }}>
        <Form>
          <Section>
            <HStack spacing={8}>
              <Image
                systemName="livephoto.play"
                color="white"
                size={18}
                modifiers={[
                  frame({ width: 28, height: 28 }),
                  background("#808080"), // ios grey
                  clipShape("roundedRectangle"),
                ]}
              />
              <Text>Live Streaming</Text>
              <Spacer />
              <Switch
                value={isLiveStreamMode}
                onValueChange={setIsLiveStreamMode}
              />
            </HStack>

            <Link href="/glass" asChild>
              <Button>
                <HStack spacing={8}>
                  <Image
                    systemName="sparkle.magnifyingglass"
                    color="white"
                    size={18}
                    modifiers={[
                      frame({ width: 28, height: 28 }),
                      background("#007aff"),
                      clipShape("roundedRectangle"),
                    ]}
                  />
                  <Text color="primary">Glass</Text>
                  <Spacer />
                  <Image
                    systemName="chevron.right"
                    size={14}
                    color="secondary"
                  />
                </HStack>
              </Button>
            </Link>

            <Link href="/glass-container" asChild>
              <Button>
                <HStack spacing={8}>
                  <Image
                    systemName="sparkle.magnifyingglass"
                    color="white"
                    size={18}
                    modifiers={[
                      frame({ width: 28, height: 28 }),
                      background("#007aff"),
                      clipShape("roundedRectangle"),
                    ]}
                  />
                  <Text color="primary">Glass Container</Text>
                  <Spacer />
                  <Image
                    systemName="chevron.right"
                    size={14}
                    color="secondary"
                  />
                </HStack>
              </Button>
            </Link>
            <Link href="/updates" asChild>
              <Button>
                <HStack spacing={8}>
                  <Image
                    systemName="arrow.down.circle"
                    color="white"
                    size={18}
                    modifiers={[
                      frame({ width: 28, height: 28 }),
                      background("#808080"),
                      clipShape("roundedRectangle"),
                    ]}
                  />
                  <Text color="primary">Updates</Text>
                  <Spacer />
                  <Image
                    systemName="chevron.right"
                    size={14}
                    color="secondary"
                  />
                </HStack>
              </Button>
            </Link>
          </Section>
        </Form>
      </Host>
    </ScrollView>
  );
}
