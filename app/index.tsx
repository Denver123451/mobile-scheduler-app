import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Colors from '@/constants/colors';
import { useState } from 'react';
import { calendarTheme } from '@/constants/calendarTheme';
import styles from './index.styles';
import { CustomForm } from '@/components/CustomForm/CustomForm';
import { customFormDefaultProps } from '@/constants/customFormDefaultProps';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  const handleDayPress = (day: any) => {
    const newDate = day.timestamp;
    setSelectedDate(newDate);
    router.push(`/${newDate}`);
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
        <CustomForm props={customFormDefaultProps} />
      </View>
    </>
  );
}
