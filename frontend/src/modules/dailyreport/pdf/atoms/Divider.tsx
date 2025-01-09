import { StyleSheet, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  divider: {
    height: 5,
    backgroundColor: '#2D3748',
    marginVertical: 2,
  },
});

export const Divider = () => {
  return <View style={styles.divider} />;
};
