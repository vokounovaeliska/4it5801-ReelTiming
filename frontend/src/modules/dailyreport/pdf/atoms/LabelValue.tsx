import { StyleSheet, Text, View } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  labelValue: {
    fontFamily: 'DejaVu Sans',
  },
  label: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  value: {},
});

export const LabelValue = ({
  label,
  value,
}: {
  label: string;
  value?: string;
}) => (
  <View style={styles.labelValue}>
    <Text>
      <Text style={styles.label}>
        {label}
        {label === '' ? '' : ':'}{' '}
      </Text>
      <Text style={styles.value}>{value || ''}</Text>
    </Text>
  </View>
);
