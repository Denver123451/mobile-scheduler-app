import React, { useState } from 'react';
import { View, Button, Platform, Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './input.styles';
import { ICustomDatePickerProps } from '@/types/types';
import Colors from '@/constants/colors';

export const CustomDatePicker = ({
  value,
  onChange,
}: ICustomDatePickerProps) => {
  const parseDateString = (dateStr: string) => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1; // месяцы начинаются с 0
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date();
  };

  const initialDate = value ? parseDateString(value) : new Date();
  const [date, setDate] = useState(initialDate);
  const [show, setShow] = useState(false);

  const onChangeDate = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShow(false);
    }
    if (selectedDate) {
      setDate(selectedDate);

      const formattedDate =
        ('0' + (selectedDate.getMonth() + 1)).slice(-2) +
        '/' +
        ('0' + selectedDate.getDate()).slice(-2) +
        '/' +
        selectedDate.getFullYear();
      onChange(formattedDate);
    }
  };

  return (
    <>
      <Pressable style={styles.input} onPress={() => setShow(true)}>
        <Text>{date.toLocaleDateString()}</Text>
      </Pressable>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </>
  );
};
