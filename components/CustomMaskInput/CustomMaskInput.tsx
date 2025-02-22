import MaskInput from 'react-native-mask-input';
import styles from './input.styles';
import { ICustomMaskInputProps } from '@/types/types';

export const CustomMaskInput = ({ value, onChange }: ICustomMaskInputProps) => {
  return (
    <MaskInput
      style={styles.input}
      value={value}
      onChangeText={(masked) => onChange(masked)}
      mask={[/\d/, /\d/, '/', /\d/, /\d/]}
      placeholder="DD/MM"
    />
  );
};
