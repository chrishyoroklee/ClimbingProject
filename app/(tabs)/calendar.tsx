import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import { Modal, View, Text} from 'react-native';

// Define types for our calendar
interface CalendarDay {
  day: string | number;
  date?: Date;
  isToday?: boolean;
  isSelected?: boolean;
  isEmpty: boolean;
}

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function CalendarScreen() {
  const colorScheme = useColorScheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [logModalVisible, setLogModalVisible] = useState(false);

  // Define event interface
  interface CalendarEvent {
    id: number;
    date: string; // e.g., "2025-04-20"
    mood: string; // emoji like "😄"
    routes: {
      name: string;
      sent: boolean;
    }[];
  }
  
  

  // Sample events
  const events: CalendarEvent[] = [
    {
      id: 1,
      date: '2025-04-20',
      mood: '💪',
      routes: [
        { name: 'Moon Crack V4', sent: true },
        { name: 'Boulder Blitz V2', sent: false },
      ],
    },
    {
      id: 2,
      date: '2025-04-18',
      mood: '😐',
      routes: [{ name: 'Slab Master V3', sent: false }],
    },
  ];
  
  const selectedDateString = selectedDate.toISOString().split('T')[0];
  const selectedEvent = events.find(event => event.date === selectedDateString);  

  const [logRoutes, setLogRoutes] = useState([{ name: '', sent: false }]);
  const [mood, setMood] = useState('😄');
  const moodOptions = ['😄', '😐', '😫', '💪', '😴'];



  //Get the last log
  const lastLog = events[events.length - 1];

  // Generate days for the current month view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    const days: CalendarDay[] = [];
  
    // Add empty cells before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', isEmpty: true });
    }
  
    // Add all actual days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.toDateString() === new Date().toDateString();
      const isSelected =
        date.toDateString() === selectedDate.toDateString();
  
      days.push({
        day: i,
        date,
        isToday,
        isSelected,
        isEmpty: false,
      });
    }
  
    // Add empty cells after the last day to complete the last week
    while (days.length % 7 !== 0) {
      days.push({ day: '', isEmpty: true });
    }
  
    return days;
  };
  

  // Calendar navigation functions
  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  // Format the month and year for display
  const formatMonthYear = () => {
    return currentMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  };

  // Render day cell
  const renderDay = ({ item }: { item: CalendarDay }) => {
    if (item.isEmpty) {
      return <ThemedView style={styles.dayCell} />;
    }

    return (
      <TouchableOpacity
        style={[
          styles.dayCell,
          item.isToday && styles.todayCell,
          item.isSelected && styles.selectedCell,
        ]}
        onPress={() => item.date && setSelectedDate(item.date)}>
        <ThemedText
          style={[
            item.isSelected && styles.selectedText,
            item.isToday && !item.isSelected && styles.todayText,
          ]}>
          {item.day}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Calendar Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>

      {/* Last Log Panel */}
      {lastLog && (
        <ThemedView style={styles.lastLogPanel}>
          <ThemedText type="defaultSemiBold">
            Last Log – {lastLog.date} {lastLog.mood}
          </ThemedText>
          {lastLog.routes.map((route, index) => (
            <ThemedText key={index}>
              • {route.name} {route.sent ? '✅' : '❌'}
            </ThemedText>
          ))}
        </ThemedView>


      )}

      {/* Month Navigation */}
      <ThemedView style={styles.monthNavigation}>
        <TouchableOpacity onPress={previousMonth}>
          <IconSymbol
            size={24}
            name="chevron.left"
            color={Colors[colorScheme ?? 'light'].text}
          />
        </TouchableOpacity>

        <ThemedText type="subtitle">{formatMonthYear()}</ThemedText>

        <TouchableOpacity onPress={nextMonth}>
          <IconSymbol
            size={24}
            name="chevron.right"
            color={Colors[colorScheme ?? 'light'].text}
          />
        </TouchableOpacity>
      </ThemedView>

      {/* Weekday Headers */}
      <ThemedView style={styles.weekdaysRow}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <ThemedView key={index} style={styles.weekdayHeader}>
            <ThemedText style={styles.weekdayText}>{day}</ThemedText>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Calendar Grid */}
      <FlatList
        data={getDaysInMonth()}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        scrollEnabled={false}
        style={styles.calendarGrid}
      />

      <TouchableOpacity onPress={() => setLogModalVisible(true)}>
        <ThemedText type="link">+ Log New Climb</ThemedText>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={logModalVisible}
        onRequestClose={() => setLogModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="subtitle">Log New Climb</ThemedText>

            {/* Mood Picker */}
            <ThemedView style={styles.moodPicker}>
              {moodOptions.map((m, idx) => (
                <TouchableOpacity key={idx} onPress={() => setMood(m)}>
                  <ThemedText style={[styles.moodOption, m === mood && styles.moodSelected]}>
                    {m}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ThemedView>

            {/* Route List */}
            {logRoutes.map((route, index) => (
              <ThemedView key={index} style={styles.routeInputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="Route name"
                  value={route.name}
                  onChangeText={text => {
                    const updated = [...logRoutes];
                    updated[index].name = text;
                    setLogRoutes(updated);
                  }}
                />
                <TouchableOpacity onPress={() => {
                  const updated = [...logRoutes];
                  updated[index].sent = !updated[index].sent;
                  setLogRoutes(updated);
                }}>
                  <ThemedText>{route.sent ? '✅' : '❌'}</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            ))}

            {/* Close & Save */}
            <TouchableOpacity onPress={() => setLogModalVisible(false)}>
              <ThemedText style={styles.saveButton}>Save Log</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>



      {/* Selected Date Events */}
      <ThemedView style={styles.eventsContainer}>
        <ThemedText type="subtitle">
          Climbing Log for {selectedDate.toLocaleDateString()}
        </ThemedText>

        {selectedEvent ? (
          <ThemedView style={styles.eventCard}>
            {/* Mood */}
            <ThemedText style={{ fontSize: 18, marginBottom: 8 }}>
              Mood: {selectedEvent.mood}
            </ThemedText>

            {/* Routes */}
            {selectedEvent.routes.map((route, index) => (
              <ThemedText key={index}>
                • {route.name} {route.sent ? '✅' : '❌'}
              </ThemedText>
            ))}
          </ThemedView>
        ) : (
          <ThemedView style={styles.noEvents}>
            <ThemedText>No climbs logged for this day</ThemedText>
          </ThemedView>
        )}
      </ThemedView>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60, // Add padding for the status bar
    paddingBottom: 80,

  },
  header: {
    marginBottom: 20,
  },
  monthNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekdaysRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekdayHeader: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  weekdayText: {
    fontWeight: '600',
  },
  calendarGrid: {
    marginBottom: 16,
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 8,
  },
  todayCell: {
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 255, 0.5)',
  },
  selectedCell: {
    backgroundColor: 'rgba(128, 128, 255, 0.2)',
  },
  todayText: {
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  eventsContainer: {
    flex: 1,
    marginTop: 16,
  },
  eventCard: {
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noEvents: {
    padding: 16,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButton: {
    marginTop: 16,
    padding: 12,
    textAlign: 'center',
    backgroundColor: '#8888ff',
    borderRadius: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  formSection: {
    marginTop: 20,
    padding: 12,
    backgroundColor: 'rgba(128,128,128,0.05)',
    borderRadius: 8,
  },
  moodPicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  moodOption: {
    fontSize: 24,
  },
  moodSelected: {
    fontSize: 28,
  },
  routeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
  },
  addRoute: {
    color: 'blue',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#333',
    padding: 12,
    marginTop: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  lastLogPanel: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
    marginBottom: 16,
  },  
  
});
