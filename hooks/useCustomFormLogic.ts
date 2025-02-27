import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { addEvent, updateEvent } from '@/store/eventSlice';
import { useRouter } from 'expo-router';
import { isValidDateTimeRange } from '@/scripts/isValidDateRange';
import { ICustomFormProps } from '@/types/types';

export const useCustomFormLogic = ({ props, isEdit }: ICustomFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const events = useSelector((state: RootState) => state.events.events);
  const eventsWithoutCurrent = events.filter((event) => event.id !== props.id);

  const [eventName, setEventName] = useState(props.eventName);
  const [startDay, setStartDay] = useState(props.startDay);
  const [startTime, setStartTime] = useState(props.startTime);
  const [endDay, setEndDay] = useState(props.endDay);
  const [endTime, setEndTime] = useState(props.endTime);
  const [repeat, setRepeat] = useState('');

  const id = props.id;

  const handleSave = () => {
    if (eventName.trim() === '') {
      alert('Enter name');
      return;
    }

    const { valid, error } = isValidDateTimeRange(
      startDay,
      endDay,
      startTime,
      endTime,
      events,
    );
    if (!valid) {
      alert(error);
      return;
    }

    dispatch(
      addEvent({
        id: Date.now(),
        eventName,
        startDay,
        startTime,
        endDay,
        endTime,
        repeat,
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

  const handleEdit = () => {
    if (eventName.trim() === '') {
      alert('Enter name');
      return;
    }

    const { valid, error } = isValidDateTimeRange(
      startDay,
      endDay,
      startTime,
      endTime,
      eventsWithoutCurrent,
    );
    if (!valid) {
      alert(error);
      return;
    }

    dispatch(
      updateEvent({
        eventName,
        startDay,
        startTime,
        endDay,
        endTime,
        id,
      }),
    );
    alert('Event successfully changed');
    router.push(`/`);
  };

  return {
    eventName,
    setEventName,
    startDay,
    setStartDay,
    startTime,
    setStartTime,
    endDay,
    setEndDay,
    endTime,
    setEndTime,
    repeat,
    setRepeat,
    handleSave,
    handleEdit,
  };
};
