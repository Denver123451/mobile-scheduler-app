import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: Colors.yellow500,
    paddingVertical: 14,
    marginTop: 16,
    borderRadius: 8,
    alignItems: 'center',
    cursor: 'pointer',
  },
  saveButtonText: {
    paddingHorizontal: 4,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;
