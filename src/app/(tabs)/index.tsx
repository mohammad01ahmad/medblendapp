import * as Device from 'expo-device';
import { Platform, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1 flex-row justify-center">
      <SafeAreaView
        className="flex-1 items-center gap-4 px-6"
        style={{ paddingBottom: BottomTabInset + Spacing.three, maxWidth: MaxContentWidth }}>
        <ThemedView className="flex-1 items-center justify-center gap-6 px-6">
          <AnimatedIcon />
          <ThemedText type="title" className="text-center">
            Welcome to MedblendApp
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" className="uppercase">
          Lets earn some money
        </ThemedText>

        <ThemedView type="backgroundElement" className="w-full gap-4 rounded-6 px-4 py-6">
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        <Pressable accessibilityRole="button" onPress={() => supabase.auth.signOut()}>
          <ThemedText type="linkPrimary">Sign out</ThemedText>
        </Pressable>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}
