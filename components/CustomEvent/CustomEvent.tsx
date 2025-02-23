import { View, Text } from 'react-native';
import { IEvent } from '@/types/types';
import styles from './event.styles';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { useDispatch } from 'react-redux';
import { removeEvent } from '@/store/eventSlice';

export const CustomEvent = ({
  id,
  eventName,
  startDay,
  endDay,
  endTime,
  startTime,
}: IEvent) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    // console.log(`delete ${id})`);
    dispatch(removeEvent(id));
  };

  const updateHandler = () => {
    console.log(`update ${id})`);
  };

  return (
    <View style={styles.eventItem}>
      <View>
        <View style={styles.eventText}>
          <Text style={styles.eventTitle}>Name : {eventName}</Text>
        </View>

        <Text style={styles.eventText}>
          Start : {startDay} {startTime}
        </Text>

        <Text style={styles.eventText}>
          End : {endDay} {endTime}
        </Text>
      </View>

      <View style={styles.buttonsWrapper}>
        <CustomButton buttonText="Update" onPress={updateHandler} />
        <CustomButton buttonText="Delete" onPress={deleteHandler} />
      </View>
    </View>
  );
};
