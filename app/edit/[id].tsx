import styles from '@/app/index.styles';
import { Text, View, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { CustomForm } from '@/components/CustomForm/CustomForm';

export default function EditEventScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const event = useSelector((state: RootState) =>
    state.events.events.find((ev) => String(ev.id) === id),
  );

  if (!event) {
    return (
      <View>
        <Text style={styles.title}>Event not found</Text>
        <Pressable onPress={() => router.push('/')}>
          <Text>Go back</Text>
        </Pressable>
      </View>
    );
  }

  const currentEventProps = {
    eventName: event?.eventName,
    startDay: event?.startDay,
    startTime: event?.startTime,
    endDay: event?.endDay,
    endTime: event?.endTime,
    id: Number(event?.id),
  };

  const handleBack = () => {
    router.push(`/`);
  };
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Edit event: {id}</Text>

      <CustomForm props={currentEventProps} isEdit />

      <CustomButton buttonText="Return to main page" onPress={handleBack} />
    </View>
  );
}
