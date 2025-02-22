import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 24,
    color: Colors.yellow500,
    fontSize: 24,
  },
  calendar: {
    borderRadius: 10,
  },
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
  saveButton: {
    backgroundColor: Colors.yellow500,
    paddingVertical: 14,
    marginTop: 50,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  timePecker: {
    minWidth: 160,
    color: Colors.grey800,
  },
  pickerWrapper: {
    minWidth: 160,
    borderWidth: 1,
    borderColor: Colors.grey500,
    borderRadius: 8,
  },
});

export default styles;
