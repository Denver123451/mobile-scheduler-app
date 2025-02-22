import { View, Text, TextInput, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '@/constants/colors';
import { useState } from 'react';
import { calendarTheme } from '@/constants/calendarTheme';
import { Picker } from '@react-native-picker/picker';
import { timeOptions } from '@/constants/timeOptions';
import { repeatOptions } from '@/constants/repeatOptions';
import styles from './index.styles';
import MaskInput from 'react-native-mask-input';
import { isValidDateTimeRange } from '@/scripts/isValidDateRange';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [eventName, setEventName] = useState('');
  const [startDay, setStartDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDay, setEndDay] = useState('');
  const [endTime, setEndTime] = useState('');
  const [repeat, setRepeat] = useState('');

  const handleDayPress = (day: any) => {
    const newDate = day.dateString;
    setSelectedDate(newDate);
    console.log('Выбрана дата:', newDate);
  };

  const handleSave = () => {
    if (eventName === '') {
      alert('Enter name');
      return;
    }

    const { valid, error } = isValidDateTimeRange(
      startDay,
      endDay,
      startTime,
      endTime,
    );
    if (!valid) {
      alert(error);
      return;
    }

    console.log({
      eventName,
      selectedDate,
      startDay,
      startTime,
      endDay,
      endTime,
      repeat,
    });
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

          <View style={styles.rowWrapper}>
            <Text style={styles.label}>Starts</Text>
            <View style={styles.inputsWrapper}>
              <MaskInput
                style={styles.input}
                value={startDay}
                onChangeText={(masked) => setStartDay(masked)}
                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                placeholder="DD/MM"
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={endTime}
                  onValueChange={(itemValue) => setStartTime(itemValue)}
                  style={styles.timePecker}
                >
                  {timeOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.rowWrapper}>
            <Text style={styles.label}>Ends</Text>
            <View style={styles.inputsWrapper}>
              <MaskInput
                style={styles.input}
                value={endDay}
                onChangeText={(masked) => setEndDay(masked)}
                mask={[/\d/, /\d/, '/', /\d/, /\d/]}
                placeholder="DD/MM"
              />
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={endTime}
                  onValueChange={(itemValue) => setEndTime(itemValue)}
                  style={styles.timePecker}
                >
                  {timeOptions.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <Text style={styles.label}>Repeat</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={repeat}
              onValueChange={(itemValue) => setRepeat(itemValue)}
              style={styles.picker}
            >
              {repeatOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </Pressable>
      </View>
    </>
  );
}
