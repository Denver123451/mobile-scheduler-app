import { View, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styles from './index.styles';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import type { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { EventsFlatList } from '@/components/EventsFlatList/EventsFlatList';

export default function DateScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.push(`/`);
  };

  const { date } = useLocalSearchParams();

  const events = useSelector((state: RootState) => state.events.events);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Events for date: {date}</Text>
      <EventsFlatList events={events} />
      <CustomButton buttonText="Return to main page" onPress={handleBack} />
    </View>
  );
}
