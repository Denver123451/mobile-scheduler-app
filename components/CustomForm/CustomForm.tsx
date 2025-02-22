import styles from './form.styles';
import { Text, TextInput, View } from 'react-native';
import { timeOptions } from '@/constants/timeOptions';
import { repeatOptions } from '@/constants/repeatOptions';
import { useState } from 'react';
import { isValidDateTimeRange } from '@/scripts/isValidDateRange';
import { ICustomFormProps } from '@/types/types';
import { CustomButton } from '@/components/CustomButton/CustomButton';
import { CustomMaskInput } from '@/components/CustomMaskInput/CustomMaskInput';
import { CustomTimePicker } from '@/components/CustomTimePicker/CustomTimePicker';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { addEvent } from '@/store/eventSlice';

export const CustomForm = ({ props }: ICustomFormProps) => {
  const events = useSelector((state: RootState) => state.events.events);
  const dispatch = useDispatch<AppDispatch>();

  const [eventName, setEventName] = useState(props.eventName);
  const [startDay, setStartDay] = useState(props.startDay);
  const [startTime, setStartTime] = useState(props.startTime);
  const [endDay, setEndDay] = useState(props.endDay);
  const [endTime, setEndTime] = useState(props.endTime);
  const [repeat, setRepeat] = useState('');

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

    dispatch(
      addEvent({
        id: Date.now(),
        eventName: eventName,
        startDay: startDay,
        startTime: startTime,
        endDay: endDay,
        endTime: endTime,
        repeat: repeat,
      }),
    );
    alert('Event successfully added');
    setEventName('');
    setStartDay('');
    setStartTime('');
    setEndDay('');
    setEndTime('');
    setRepeat('');
  };

  return (
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
          <CustomMaskInput value={startDay} onChange={setStartDay} />
          <CustomTimePicker
            value={startTime}
            onChange={setStartTime}
            pickerItems={timeOptions}
          />
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <Text style={styles.label}>Ends</Text>
        <View style={styles.inputsWrapper}>
          <CustomMaskInput value={endDay} onChange={setEndDay} />
          <CustomTimePicker
            value={endTime}
            onChange={setEndTime}
            pickerItems={timeOptions}
          />
        </View>
      </View>
      <View style={styles.repeatWrapper}>
        <Text style={styles.label}>Repeat</Text>
        <CustomTimePicker
          value={repeat}
          onChange={setRepeat}
          pickerItems={repeatOptions}
        />
      </View>

      <CustomButton buttonText="Save" onPress={handleSave} />
    </View>
  );
};
