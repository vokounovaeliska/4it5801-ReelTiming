import { StyleSheet, View } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '@frontend/modules/dailyreport/interfaces/interface';
import { formatDateToDisplay } from '@frontend/modules/timesheets/utils/timeUtils';

import { LabelValue } from './LabelValue';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: 10,
    fontFamily: 'DejaVu Sans',
    justifyContent: 'flex-start',
  },
  item: {
    width: '33.33%',
    paddingBottom: 3,
  },
});

const ReportIntro = ({ data }: { data?: DailyReportPreviewInfoQuery }) => {
  const dailyReport = data?.shootingDay?.dailyReport;
  const introItems =
    dailyReport && dailyReport.length > 0 ? dailyReport[0].intro : [];

  const items = [
    introItems[0] || { title: '', value: '' },
    {
      title: 'Date',
      value: formatDateToDisplay(data?.shootingDay?.date ?? ''),
    },
    ...introItems.slice(1),
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.item}>
          <LabelValue label={item.title ?? ''} value={item.value ?? ''} />
        </View>
      ))}
    </View>
  );
};

export default ReportIntro;
