import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { FaDownload } from 'react-icons/fa';

import { DailyReportPreviewInfoQuery } from '../interfaces/interface';

import MyPDFDocument from './DailyReportPdf';

type PDFGeneratorProps = {
  data?: DailyReportPreviewInfoQuery;
};

const PDFGenerator = ({ data }: PDFGeneratorProps) => {
  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <PDFViewer style={{ width: '100%', height: '600px' }}>
        <MyPDFDocument data={data} />
      </PDFViewer>
      <PDFDownloadLink
        document={<MyPDFDocument data={data} />}
        fileName="DailyReport.pdf"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#DD6B20',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
        }}
      >
        <FaDownload style={{ marginRight: '10px' }} />
        Download Report
      </PDFDownloadLink>
    </div>
  );
};

export default PDFGenerator;
