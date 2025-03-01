import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.grey500,
    borderRadius: 8,
    paddingVertical: 8,
    fontSize: 16,
    minWidth: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
