import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <ThemedText style={styles.headerTitle}>Climbing Project</ThemedText>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}></ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          {/* <Image
            source={require('@/assets/images/home-icon.png')}
            style={styles.tabIcon}
          /> */}
          <ThemedText style={styles.tabLabel}>Home</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          {/* <Image
            source={require('@/assets/images/calendar-icon.png')}
            style={styles.tabIcon}
          /> */}
          <ThemedText style={styles.tabLabel}>Calendar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <View style={styles.activeTabIndicator} />
          {/* <Image
            source={require('@/assets/images/profile-icon.png')}
            style={[styles.tabIcon, styles.activeTabIcon]}
          /> */}
          <ThemedText style={[styles.tabLabel, styles.activeTabLabel]}>
            Profile
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          {/* <Image
            source={require('@/assets/images/community-icon.png')}
            style={styles.tabIcon}
          /> */}
          <ThemedText style={styles.tabLabel}>community</ThemedText>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 70, // Add padding for tab bar
  },
  profileHeader: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  climberName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  statsTable: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  statsRow: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CCCCCC',
  },
  statsCell: {
    flex: 1,
    padding: 12,
  },
  statsLabel: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
    fontSize: 16,
  },
  statsValue: {
    textAlign: 'center',
    fontSize: 18,
  },
  sectionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    backgroundColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  ascentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 20,
    minHeight: 80,
  },
  goalsPlaceholder: {
    height: 200,
    backgroundColor: '#E0E0E0',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
    tintColor: '#777777',
  },
  tabLabel: {
    fontSize: 12,
    color: '#777777',
  },
  activeTabIcon: {
    tintColor: '#0078D4',
  },
  activeTabLabel: {
    color: '#0078D4',
    fontWeight: 'bold',
  },
  activeTabIndicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    width: '50%',
    backgroundColor: '#0078D4',
    borderRadius: 1.5,
  },
});
