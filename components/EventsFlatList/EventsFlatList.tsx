import { View, FlatList } from 'react-native';
import styles from './flatList.styles';
import { IEventState } from '@/types/types';
import { CustomEvent } from '@/components/CustomEvent/CustomEvent';

export const EventsFlatList = ({ events, date }: IEventState) => {
  return (
    <View style={styles.eventsContainer}>
      <FlatList
        data={events}
        renderItem={(itemData) => {
          return (
            <CustomEvent
              id={itemData.item.id}
              eventName={itemData.item.eventName}
              endDay={itemData.item.endDay}
              endTime={itemData.item.endTime}
              startDay={itemData.item.startDay}
              startTime={itemData.item.startTime}
              targetDate={date}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        alwaysBounceVertical={false}
      />
    </View>
  );
};
