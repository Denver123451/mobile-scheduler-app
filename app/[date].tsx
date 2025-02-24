import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from './index.styles';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { EventsFlatList } from '@/components/EventsFlatList/EventsFlatList';
import { filterEventsByDate } from '@/scripts/isValidDateRange';

export default function DateScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/`);
  };

  const { date } = useLocalSearchParams();

  const targetDate = new Date(+date).toDateString();

  const events = useSelector((state: RootState) => state.events.events);

  const filteredEvents = filterEventsByDate(+date, events);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Events for date: {targetDate}</Text>
      {filteredEvents.length === 0 ? (
        <Text style={styles.text}>No events for this day</Text>
      ) : (
        <EventsFlatList events={filteredEvents} />
      )}

      <CustomButton buttonText="Return to main page" onPress={handleBack} />
    </View>
  );
}
