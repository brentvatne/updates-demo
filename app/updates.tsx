import {
  Button,
  Form,
  Host,
  HStack,
  Image,
  Picker,
  Section,
  Spacer,
  Text,
} from "@expo/ui/swift-ui";
import { background, clipShape, frame } from "@expo/ui/swift-ui/modifiers";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function UpdatesScreen() {
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>(
    Updates.channel ?? "main",
  );
  const channels = ["main", "livestream", "secret"];
  const [availableUpdate, setAvailableUpdate] = useState<any | null>(null);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const { isDownloading, downloadProgress } = Updates.useUpdates();

  const revisionId = Updates.updateId ?? null;
  const runtimeVersion = Updates.runtimeVersion ?? null;

  function setChannelOverride(name: string) {
    setSelectedChannel(name);
    try {
      Updates.setUpdateRequestHeadersOverride({
        "expo-channel-name": name,
      });
      setStatus(`Channel set to ${name}.`);
    } catch (e: any) {
      const message = e?.message ?? String(e);
      setStatus(message);
    }
  }

  async function onCheckForUpdates() {
    if (isChecking) return;
    setIsChecking(true);
    setStatus("Checking for updates…");
    try {
      const result = await Updates.checkForUpdateAsync();
      if (result?.isAvailable) {
        setAvailableUpdate(result);
        setStatus("Downloading update… 0%");
        const fetchResult = await Updates.fetchUpdateAsync();
        if (fetchResult?.isNew) {
          setIsDownloaded(true);
          setStatus("Update ready to apply.");
        } else {
          setStatus("No new update downloaded.");
        }
      } else {
        setStatus("You're up to date.");
      }
    } catch (e: any) {
      const message = e?.message ?? String(e);
      setStatus(message);
      Alert.alert("Update check failed", message);
    } finally {
      setIsChecking(false);
    }
  }

  async function reloadWithSpinner() {
    try {
      setStatus("Reloading…");
      await Updates.reloadAsync({
        reloadScreenOptions: {
          backgroundColor: "#ffffff",
          spinner: { enabled: true, size: "medium", color: "#007aff" },
          fade: true,
        },
      });
    } catch (e: any) {
      setStatus(e?.message ?? String(e));
    }
  }

  async function reloadWithImage() {
    try {
      setStatus("Reloading…");
      await Updates.reloadAsync({
        reloadScreenOptions: {
          image: require("../assets/images/livestream.png"),
          fade: true,
        },
      });
    } catch (e: any) {
      setStatus(e?.message ?? String(e));
    }
  }

  useEffect(() => {
    if (isDownloading && typeof downloadProgress === "number") {
      const pct = Math.max(
        0,
        Math.min(100, Math.floor(downloadProgress * 100)),
      );
      setStatus(`Downloading update… ${pct}%`);
    }
  }, [isDownloading, downloadProgress]);

  return (
    <Host style={{ flex: 1 }}>
      <Form>
        <Section>
          <HStack spacing={8}>
            <Image
              systemName="number"
              color="white"
              size={18}
              modifiers={[
                frame({ width: 28, height: 28 }),
                background("#808080"),
                clipShape("roundedRectangle"),
              ]}
            />
            <Text>Revision</Text>
            <Spacer />
            <Text color="secondary" size={12} lineLimit={1}>
              {revisionId ?? "Unknown"}
            </Text>
          </HStack>

          <HStack spacing={8}>
            <Image
              systemName="dot.radiowaves.left.and.right"
              color="white"
              size={18}
              modifiers={[
                frame({ width: 28, height: 28 }),
                background("#808080"),
                clipShape("roundedRectangle"),
              ]}
            />
            <Text>Channel</Text>
            <Spacer />
            <Picker
              options={channels}
              variant="menu"
              selectedIndex={
                channels.indexOf(selectedChannel) >= 0
                  ? channels.indexOf(selectedChannel)
                  : 0
              }
              onOptionSelected={(event: {
                nativeEvent: { index: number; label: string };
              }) => {
                const idx = event?.nativeEvent?.index ?? 0;
                const next = channels[idx] ?? channels[0];
                setChannelOverride(next);
              }}
            />
          </HStack>

          {availableUpdate ? (
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
              <Text>Available Update</Text>
              <Spacer />
              <Text color="secondary" size={12} lineLimit={1}>
                {(availableUpdate as any)?.manifest?.runtimeVersion ??
                  (availableUpdate as any)?.runtimeVersion ??
                  "Ready"}
              </Text>
            </HStack>
          ) : null}

          <HStack spacing={8}>
            <Image
              systemName="gearshape"
              color="white"
              size={18}
              modifiers={[
                frame({ width: 28, height: 28 }),
                background("#808080"),
                clipShape("roundedRectangle"),
              ]}
            />
            <Text>Runtime</Text>
            <Spacer />
            <Text color="secondary">{runtimeVersion ?? "Unknown"}</Text>
          </HStack>

          <HStack spacing={8}>
            <Image
              systemName="info.circle"
              color="white"
              size={18}
              modifiers={[
                frame({ width: 28, height: 28 }),
                background("#808080"),
                clipShape("roundedRectangle"),
              ]}
            />
            <Text>Status</Text>
            <Spacer />
            <Text color="secondary" size={12}>
              {status ?? "-"}
            </Text>
          </HStack>
        </Section>

        <Section>
          <Button onPress={onCheckForUpdates} disabled={isChecking}>
            <HStack spacing={8}>
              <Image
                systemName="arrow.down.circle"
                color="white"
                size={18}
                modifiers={[
                  frame({ width: 28, height: 28 }),
                  background("#007aff"),
                  clipShape("roundedRectangle"),
                ]}
              />
              <Text color="primary">
                {isChecking ? "Checking…" : "Check for Updates"}
              </Text>
              <Spacer />
              <Image systemName="chevron.right" size={14} color="secondary" />
            </HStack>
          </Button>

          {isDownloaded ? (
            <>
              <Button onPress={reloadWithSpinner} disabled={isChecking}>
                <HStack spacing={8}>
                  <Image
                    systemName="arrow.triangle.2.circlepath"
                    color="white"
                    size={18}
                    modifiers={[
                      frame({ width: 28, height: 28 }),
                      background("#007aff"),
                      clipShape("roundedRectangle"),
                    ]}
                  />
                  <Text color="primary">Reload (spinner)</Text>
                  <Spacer />
                  <Image
                    systemName="chevron.right"
                    size={14}
                    color="secondary"
                  />
                </HStack>
              </Button>

              <Button onPress={reloadWithImage} disabled={isChecking}>
                <HStack spacing={8}>
                  <Image
                    systemName="photo"
                    color="white"
                    size={18}
                    modifiers={[
                      frame({ width: 28, height: 28 }),
                      background("#34c759"),
                      clipShape("roundedRectangle"),
                    ]}
                  />
                  <Text color="primary">Reload (image)</Text>
                  <Spacer />
                  <Image
                    systemName="chevron.right"
                    size={14}
                    color="secondary"
                  />
                </HStack>
              </Button>
            </>
          ) : null}
        </Section>
      </Form>
    </Host>
  );
}
