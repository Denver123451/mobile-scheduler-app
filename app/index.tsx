import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { calendarTheme } from '@/constants/calendarTheme';
import styles from './index.styles';
import { CustomForm } from '@/components/CustomForm/CustomForm';
import { customFormDefaultProps } from '@/constants/customFormDefaultProps';
import { useCalendarLogic } from '@/hooks/useCalendarLogic';

export default function HomeScreen() {
  const { handleDayPress, getMarkedDates } = useCalendarLogic();

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Event Scheduling App</Text>
      <Calendar
        style={styles.calendar}
        onDayPress={handleDayPress}
        markingType="custom"
        markedDates={getMarkedDates()}
        theme={calendarTheme}
      />
      <CustomForm props={customFormDefaultProps} />
    </View>
  );
}
