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
import { useState } from "react";
import { Alert } from "react-native";

export default function UpdatesScreen() {
  const [isChecking, setIsChecking] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<string>(
    ((Updates as any).channel as string) ?? "main",
  );
  const channels = ["main", "livestream", "secret"];

  const revisionId = Updates.updateId ?? null;
  const runtimeVersion = Updates.runtimeVersion ?? null;

  function setChannelOverride(name: string) {
    setSelectedChannel(name);
    try {
      if ((Updates as any).setUpdateRequestHeaders) {
        (Updates as any).setUpdateRequestHeaders({
          "expo-channel-name": name,
        });
        setStatus(`Channel set to ${name}.`);
      } else {
        setStatus(
          "Channel override not supported in this build (missing setUpdateRequestHeaders).",
        );
      }
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
      if ((Updates as any).setUpdateRequestHeaders) {
        (Updates as any).setUpdateRequestHeaders({
          "expo-channel-name": selectedChannel,
        });
      }
      const result = await Updates.checkForUpdateAsync();
      if (result?.isAvailable) {
        setStatus("Downloading update… 0%");
        let subscription: any;
        try {
          if ((Updates as any).addListener) {
            subscription = (Updates as any).addListener((event: any) => {
              const type = event?.type ?? event?.eventType;
              const DOWNLOAD_PROGRESS =
                (Updates as any).UpdateEventType?.DOWNLOAD_PROGRESS ??
                "DOWNLOAD_PROGRESS";
              if (type === DOWNLOAD_PROGRESS) {
                const written =
                  event?.totalBytesWritten ?? event?.downloadedBytes ?? 0;
                const total =
                  event?.totalBytesExpectedToWrite ?? event?.totalBytes ?? 0;
                if (total > 0) {
                  const pct = Math.max(
                    0,
                    Math.min(100, Math.floor((written / total) * 100)),
                  );
                  setStatus(`Downloading update… ${pct}%`);
                } else {
                  setStatus(`Downloading update… ${written} bytes`);
                }
              }
            });
          }

          if ((Updates as any).downloadUpdateAsync) {
            await (Updates as any).downloadUpdateAsync();
          } else if ((Updates as any).fetchUpdateAsync) {
            await (Updates as any).fetchUpdateAsync();
          }
        } finally {
          if (subscription?.remove) subscription.remove();
        }
        setStatus("Applying update…");
        await Updates.reloadAsync();
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
            <Text color="secondary">{revisionId ?? "Unknown"}</Text>
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

          {status ? (
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
                {status}
              </Text>
            </HStack>
          ) : null}
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
        </Section>
      </Form>
    </Host>
  );
}
