import { Pressable, Text } from 'react-native';
import styles from './button.styles';
import { ICustomButtonProps } from '@/types/types';

export const CustomButton = ({ buttonText, onPress }: ICustomButtonProps) => {
  return (
    <Pressable style={styles.saveButton} onPress={onPress}>
      <Text style={styles.saveButtonText}>{buttonText}</Text>
    </Pressable>
  );
};
