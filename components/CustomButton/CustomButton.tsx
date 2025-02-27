import { Pressable, Text } from 'react-native';
import styles from './button.styles';
import { ICustomButtonProps } from '@/types/types';
import Colors from '@/constants/colors';

export const CustomButton = ({ buttonText, onPress }: ICustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.saveButton, styles.pressed] : styles.saveButton
      }
      onPress={onPress}
      android_ripple={{ color: Colors.yellow700 }}
    >
      <Text style={styles.saveButtonText}>{buttonText}</Text>
    </Pressable>
  );
};
