import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { useState } from 'react';
import { ActivityIndicator, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const colors = useTheme();

  async function signInWithGoogle() {
    setError(null);
    setSigningIn(true);
    try {
      const redirectTo = Linking.createURL('/');
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, skipBrowserRedirect: true, queryParams: { prompt: 'select_account' } },
      });
      if (oauthError || !data.url) throw oauthError ?? new Error('No auth URL returned');

      const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
      if (result.type !== 'success') return;

      const { queryParams } = Linking.parse(result.url);
      const code = queryParams?.code;
      if (typeof code !== 'string') throw new Error('No authorization code returned');

      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) throw exchangeError;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed');
    } finally {
      setSigningIn(false);
    }
  }

  return (
    <ThemedView className="flex-1 justify-center">
      <SafeAreaView className="flex-1 items-center justify-center gap-6 px-6">
        <ThemedText type="title" className="text-center">
          Welcome to MedblendApp
        </ThemedText>

        <Pressable
          accessibilityRole="button"
          disabled={signingIn}
          onPress={signInWithGoogle}
          className={`min-w-[220px] items-center justify-center rounded-4 bg-element px-8 py-4 ${
            signingIn ? 'opacity-60' : ''
          }`}>
          {signingIn ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <ThemedText type="smallBold">Sign in with Google</ThemedText>
          )}
        </Pressable>

        {error && (
          <ThemedText type="small" className="text-[crimson]">
            {error}
          </ThemedText>
        )}
      </SafeAreaView>
    </ThemedView>
  );
}
