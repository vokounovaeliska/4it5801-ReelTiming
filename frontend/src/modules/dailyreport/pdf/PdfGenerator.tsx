import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { FaDownload } from 'react-icons/fa';

import { DailyReportPreviewInfoQuery } from '../interfaces/interface';

import MyPDFDocument from './DailyReportPdf';

type PDFGeneratorProps = {
  data?: DailyReportPreviewInfoQuery;
};

const PDFGenerator = ({ data }: PDFGeneratorProps) => {
  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <PDFDownloadLink
        document={<MyPDFDocument data={data} />}
        fileName="DailyReport.pdf"
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#DD6B20',
          color: 'white',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          width: 'fit-content',
        }}
      >
        <FaDownload style={{ marginRight: '10px' }} />
        Download Report
      </PDFDownloadLink>
      <PDFViewer
        style={{
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MyPDFDocument data={data} />
      </PDFViewer>
    </div>
  );
};

export default PDFGenerator;
