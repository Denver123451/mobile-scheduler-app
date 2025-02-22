import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.grey500,
    borderRadius: 8,
    paddingVertical: 8,
    fontSize: 16,
    minWidth: 120,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  inputsWrapper: {
    flexDirection: 'row',
    gap: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: Colors.grey800,
  },
});

export default styles;
