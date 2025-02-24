import { StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 24,
    color: Colors.yellow500,
    fontSize: 24,
  },
  text: {
    paddingBottom: 24,
    color: Colors.grey800,
    fontSize: 24,
  },
  calendar: {
    borderRadius: 10,
  },
});

export default styles;
