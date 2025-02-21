import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '@/constants/colors';
import { useState } from 'react';
import { calendarTheme } from '@/constants/calendarTheme';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeat, setRepeat] = useState('weekly');

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    console.log('Выбрана дата:', selectedDate);
  };
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Event Scheduling App</Text>
        <Calendar
          style={styles.calendar}
          onDayPress={handleDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: Colors.yellow500,
            },
          }}
          theme={calendarTheme}
        />

        <View style={styles.form}>
          <Text style={styles.label}>Event Name</Text>
          <TextInput
            style={styles.input}
            value={eventName}
            onChangeText={setEventName}
            placeholder="Every Name"
          />

          <View>
            <Text style={styles.label}>Starts</Text>
            <TextInput
              style={styles.input}
              value={startTime}
              onChangeText={setStartTime}
              placeholder="Jan 28, 2025 03:00 PM"
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 24,
    color: Colors.yellow500,
    fontSize: 24,
  },
  calendar: {
    borderRadius: 10,
  },
  form: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey500,
    borderRadius: 8,
    paddingVertical: 8,
    fontSize: 16,
  },
});
