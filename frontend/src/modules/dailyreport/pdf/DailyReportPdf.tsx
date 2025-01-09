import { Document, Font, Page, StyleSheet } from '@react-pdf/renderer';

import { DailyReportPreviewInfoQuery } from '../interfaces/interface';

import { Divider } from './atoms/Divider';
import ReportCrewStatementsTable from './atoms/ReportCrewStatementsTable ';
import ReportFooter from './atoms/ReportFooter';
import ReportHeader from './atoms/ReportHeader';
import ReportIntro from './atoms/ReportIntro';

Font.register({
  family: 'DejaVu Sans',
  fonts: [
    { src: '/fonts/DejaVuSans.ttf', fontWeight: 'normal' },
    { src: '/fonts/DejaVuSans-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontFamily: 'DejaVu Sans',
    fontSize: 7,
  },
});

const MyPDFDocument = ({ data }: { data?: DailyReportPreviewInfoQuery }) => (
  <Document>
    <Page style={styles.page}>
      <ReportHeader data={data} />
      <Divider />
      <ReportIntro data={data} />
      <Divider />
      <ReportCrewStatementsTable data={data} />
      <Divider />
      <ReportFooter data={data} />
    </Page>
  </Document>
);

export default MyPDFDocument;
