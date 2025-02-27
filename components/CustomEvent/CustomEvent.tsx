import { View, Text } from 'react-native';
import { IEvent } from '@/types/types';
import styles from './event.styles';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { removeEvent } from '@/store/eventSlice';
import { useRouter } from 'expo-router';
import { addDays, diffDates, parseDateTime } from '@/scripts/isValidDateRange';

export const CustomEvent = ({
  id,
  eventName,
  startDay,
  endDay,
  endTime,
  startTime,
  targetDate,
  repeat,
}: IEvent) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const deleteHandler = () => {
    dispatch(removeEvent(id));
  };

  const updateHandler = () => {
    router.push(`/edit/${id}`);
  };

  let repeatDateToView = 0;
  if (repeat !== '') {
    repeatDateToView = diffDates(
      targetDate ?? parseDateTime(startDay, startTime).getDate(),
      parseDateTime(startDay, startTime),
    );
  }

  const start = addDays(parseDateTime(startDay, startTime), repeatDateToView);
  const end = addDays(parseDateTime(endDay, endTime), repeatDateToView);

  return (
    <View style={styles.eventItem}>
      <View>
        <View style={styles.eventText}>
          <Text style={styles.eventTitle}>Name : {eventName}</Text>
        </View>

        <Text style={styles.eventText}>
          Start : {start} {startTime}
        </Text>

        <Text style={styles.eventText}>
          End : {end} {endTime}
        </Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <CustomButton buttonText="Update" onPress={updateHandler} />
        <CustomButton buttonText="Delete" onPress={deleteHandler} />
      </View>
    </View>
  );
};
