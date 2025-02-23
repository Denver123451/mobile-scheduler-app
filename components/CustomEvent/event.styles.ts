import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  eventItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: Colors.grey300,
    borderWidth: 1,
    borderColor: Colors.grey500,
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventText: {
    color: Colors.grey800,
    marginBottom: 4,
  },
  eventTitle: {
    color: Colors.grey800,
    fontSize: 20,
    fontWeight: 700,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
