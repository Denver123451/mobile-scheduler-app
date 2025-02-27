import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import { IEvent } from '@/types/types';
import Colors from '@/constants/colors';
import { formatDate, parseDate } from '@/scripts/isValidDateRange';

export const useCalendarLogic = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();
  const events = useSelector((state: RootState) => state.events.events);

  const handleDayPress = (day: any) => {
    const newDate = day.timestamp;
    setSelectedDate(day.dateString);
    router.push(`/${newDate}`);
  };

  const getMarkedDates = () => {
    const marked: Record<string, any> = {};

    events.forEach((event: IEvent) => {
      const start = parseDate(event.startDay);
      const end = parseDate(event.endDay);
      let current = new Date(start);
      while (current <= end) {
        const dateString = formatDate(current);
        marked[dateString] = {
          customStyles: {
            container: {
              borderWidth: 2,
              borderColor: Colors.yellow500,
              borderRadius: 16,
            },
            text: {
              color: Colors.grey800,
            },
          },
        };
        current.setDate(current.getDate() + 1);
      }
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: Colors.yellow500,
      };
    }
    return marked;
  };

  return { selectedDate, handleDayPress, getMarkedDates };
};
