import { StyleSheet, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text>Hello World!</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
