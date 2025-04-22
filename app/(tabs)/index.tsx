import {
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigateToRoute = (routeId: string) => {
    // For development only - replace with actual navigation later
    console.log(`Navigation to route ${routeId} requested`);
    // You could also add an alert to show on the device
    // Alert.alert('Navigation', `Would navigate to route: ${routeId}`);

    // Uncomment when ready to implement real navigation
    // router.push(`/routes/${routeId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headerContainer}>
        <ThemedText style={styles.headerTitle}>Climbing Project</ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find my gym..."
            placeholderTextColor="#888"
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <View style={styles.searchIcon}>
            {/* Replace with actual search icon */}
            <ThemedText style={{ fontSize: 20 }}>🔍</ThemedText>
          </View>
        </TouchableOpacity>
      </View>

      {/* Gym Map */}
      <View style={styles.mapContainer}>
        {/* Placeholder for the gym map image */}
        <View style={styles.gymMap}>
          {/* Sample areas - replace with dynamic content */}
          <View style={[styles.gymArea, { top: '20%', left: '25%' }]}>
            <ThemedText style={styles.areaLabel}>23</ThemedText>
            <ThemedText style={styles.areaName}>Buddha</ThemedText>
          </View>

          <View style={[styles.gymArea, { top: '30%', left: '45%' }]}>
            <ThemedText style={styles.areaLabel}>3D</ThemedText>
          </View>

          <View style={[styles.gymArea, { top: '30%', right: '10%' }]}>
            <ThemedText style={styles.areaLabel}>
              Bulge, Prow, Corner
            </ThemedText>
          </View>

          <View style={[styles.gymArea, { bottom: '30%', left: '15%' }]}>
            <ThemedText style={styles.areaLabel}>Alcove & 45</ThemedText>
          </View>

          <View style={[styles.gymArea, { bottom: '10%', left: '40%' }]}>
            <ThemedText style={styles.areaLabel}>Slab</ThemedText>
          </View>

          <View style={[styles.gymArea, { top: '40%', left: '5%' }]}>
            <ThemedText style={styles.areaLabel}>11</ThemedText>
            <ThemedText style={styles.areaName}>Mezzanine</ThemedText>
          </View>
        </View>
      </View>

      {/* Route Filters */}
      <View style={styles.filterContainer}>
        <ThemedText style={styles.filterTitle}>Find route by:</ThemedText>
        <View style={styles.filterButtons}>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterButtonText}>Grade</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <ThemedText style={styles.filterButtonText}>Style</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Routes List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        {/* Route Card - repeat for multiple routes */}
        {[1, 2, 3, 4].map(item => (
          <TouchableOpacity
            key={item}
            style={styles.routeCard}
            onPress={() => handleNavigateToRoute(`route-${item}`)}>
            <View style={styles.routeImageContainer}>
              {/* Replace with actual route image */}
              <View style={styles.routeImagePlaceholder} />
            </View>
            <View style={styles.routeInfo}>
              <ThemedText style={styles.routeTitle}>White V4</ThemedText>
              <ThemedText style={styles.routeLocation}>Mezzanine</ThemedText>
              <View style={styles.routeTags}>
                <ThemedText style={styles.routeTag}>#Crimp</ThemedText>
                <ThemedText style={styles.routeTag}>#Coordination</ThemedText>
              </View>
              <ThemedText style={styles.routeAscents}>Ascents: 12</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Tab Navigation */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <ThemedText style={styles.tabLabel}>Routes</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <ThemedText style={styles.tabLabel}>Community</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <ThemedText style={styles.tabLabel}>Calendar</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>
          <ThemedText style={styles.tabLabel}>Profile</ThemedText>
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
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInputContainer: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  searchInput: {
    fontSize: 16,
  },
  searchButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    height: 280,
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  gymMap: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    position: 'relative',
    borderRadius: 8,
  },
  gymArea: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
  },
  areaLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  areaName: {
    fontSize: 12,
  },
  filterContainer: {
    padding: 10,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  filterButtonText: {
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContent: {
    padding: 10,
    paddingBottom: 70, // Add padding for tab bar
  },
  routeCard: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  routeImageContainer: {
    width: 100,
    height: 100,
  },
  routeImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#555555',
  },
  routeInfo: {
    flex: 1,
    padding: 10,
  },
  routeTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  routeLocation: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  routeTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  routeTag: {
    color: '#FFFFFF',
    fontSize: 12,
    marginRight: 8,
  },
  routeAscents: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'right',
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
  tabLabel: {
    fontSize: 12,
    color: '#777777',
  },
});
