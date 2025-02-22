import { View } from 'react-native';
import styles from './picker.styles';
import { Picker } from '@react-native-picker/picker';
import { ICustomTimePickerProps } from '@/types/types';

export const CustomTimePicker = ({
  value,
  onChange,
  pickerItems,
}: ICustomTimePickerProps) => {
  return (
    <View style={styles.pickerWrapper}>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue) => onChange(itemValue)}
        style={styles.timePecker}
      >
        {pickerItems.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};
