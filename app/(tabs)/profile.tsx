import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#9CBFD9', dark: '#1A3349' }}
      headerImage={<Image style={styles.headerImage} />}>
      <ThemedView style={styles.profileContainer}>
        <ThemedText type="title">John Doe</ThemedText>
        <ThemedText type="defaultSemiBold">@johndoe</ThemedText>
        <ThemedText style={styles.bio}>
          React Native developer. Outdoor enthusiast. Coffee lover.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statItem}>
          <ThemedText type="title">42</ThemedText>
          <ThemedText>Posts</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="title">128</ThemedText>
          <ThemedText>Followers</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statItem}>
          <ThemedText type="title">97</ThemedText>
          <ThemedText>Following</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">About</ThemedText>
        <ThemedText>
          This is a simple profile screen template for your app. You can
          customize it to display user information, settings, or any other
          profile-related content.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Settings</ThemedText>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            // Navigate to settings or trigger an action
            // router.push('/settings');
          }}>
          <ThemedText>Edit Profile</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            // Sign out logic here
          }}>
          <ThemedText>Sign Out</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 120,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  bio: {
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 32,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    marginBottom: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(128, 128, 128, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
    gap: 8,
  },
  settingsButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
});
