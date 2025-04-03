import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';

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

  // Define event interface
  interface CalendarEvent {
    id: number;
    title: string;
    time: string;
    description: string;
  }

  // Sample events
  const events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Team Meeting',
      time: '10:00 AM',
      description: 'Weekly sync with the team',
    },
    {
      id: 2,
      title: 'Lunch with Sarah',
      time: '12:30 PM',
      description: 'Discuss new project ideas',
    },
    { id: 3, title: 'Gym Session', time: '5:00 PM', description: 'Cardio day' },
  ];

  // Generate days for the current month view
  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Calculate first day of month and how many empty cells needed
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Array for our grid
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', isEmpty: true });
    }

    // Add all days in the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push({
        day: i,
        date: date,
        isToday: isToday,
        isSelected: isSelected,
        isEmpty: false,
      });
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
    <ThemedView style={styles.container}>
      {/* Calendar Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title">Calendar</ThemedText>
      </ThemedView>

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

      {/* Selected Date Events */}
      <ThemedView style={styles.eventsContainer}>
        <ThemedText type="subtitle">
          Events for {selectedDate.toLocaleDateString()}
        </ThemedText>

        {events.length > 0 ? (
          events.map(event => (
            <ThemedView key={event.id} style={styles.eventCard}>
              <ThemedView style={styles.eventHeader}>
                <ThemedText type="defaultSemiBold">{event.title}</ThemedText>
                <ThemedText>{event.time}</ThemedText>
              </ThemedView>
              <ThemedText>{event.description}</ThemedText>
            </ThemedView>
          ))
        ) : (
          <ThemedView style={styles.noEvents}>
            <ThemedText>No events scheduled for today</ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60, // Add padding for the status bar
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
});
