import { useState } from 'react';
import { Button, Spinner } from '@chakra-ui/react';

type PdfReportGeneratorProps = {
  projectUserId: string;
  startDate: string;
  endDate: string;
  authUser: string;
};

const PdfReportGeneratorButton = ({
  projectUserId,
  startDate,
  endDate,
  authUser,
}: PdfReportGeneratorProps) => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePdf = async () => {
    setLoading(true);

    try {
      // Make the request to the backend API
      const response = await fetch(
        `https://dev-backend-team04-vse.handson.pro=${encodeURIComponent(
          projectUserId,
        )}&startDate=${encodeURIComponent(
          startDate,
        )}&endDate=${encodeURIComponent(
          endDate,
        )}&userId=${encodeURIComponent(authUser)}`,
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
      <Button
        colorScheme="orange"
        type="submit"
        mt="4"
        isLoading={loading}
        isDisabled={loading}
        onClick={handleGeneratePdf}
      >
        {loading ? <Spinner size="sm" /> : 'Generate PDF'}
      </Button>
    </>
  );
};
export default PdfReportGeneratorButton;
