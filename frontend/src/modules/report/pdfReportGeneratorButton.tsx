import { useState } from 'react';
import { Box, Button, Spinner } from '@chakra-ui/react';

import { config } from '@frontend/config';

type PdfReportGeneratorProps = {
  projectUserId: string;
  startDate: string;
  endDate: string;
  authUserId: string;
};

const PdfReportGeneratorButton = ({
  projectUserId,
  startDate,
  endDate,
  authUserId,
}: PdfReportGeneratorProps) => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePdf = async () => {
    setLoading(true);

    try {
      const apiUrl = config.BACKEND_APP_PDF_API;
      if (!apiUrl) {
        console.error('error: `BACKEND_APP_PDF_API` env variable not defined');
        process.exit(1);
      }
      const response = await fetch(
        `${apiUrl}?projectUserId=${encodeURIComponent(
          projectUserId,
        )}&startDate=${encodeURIComponent(
          startDate,
        )}&endDate=${encodeURIComponent(
          endDate,
        )}&userId=${encodeURIComponent(authUserId)}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${new Date().toISOString()}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box alignItems="center">
        <Button
          colorScheme="orange"
          type="submit"
          variant="outline"
          mt="4"
          isLoading={loading}
          isDisabled={loading}
          onClick={handleGeneratePdf}
        >
          {loading ? <Spinner size="sm" /> : 'Generate PDF'}
        </Button>
      </Box>
    </>
  );
};
export default PdfReportGeneratorButton;
