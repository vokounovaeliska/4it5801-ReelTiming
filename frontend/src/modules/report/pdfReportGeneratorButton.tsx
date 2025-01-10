import { useState } from 'react';
import { Box, Button, ButtonProps, Spinner } from '@chakra-ui/react';

import { config } from '@frontend/config';
import { showErrorToast } from '@frontend/shared/design-system/molecules/toastUtils';

import { UserOption } from '../timesheets/interfaces';

export type InputFieldProps = ButtonProps;

type PdfReportGeneratorProps = {
  projectUserId: string;
  startDate: string;
  endDate: string;
  isDisabled?: boolean;
  selectedUsers: UserOption[];
};

const formatDate = (date: string): string => {
  return new Date(date)
    .toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'numeric',
    })
    .replace(/\//g, '.');
};

const PdfReportGeneratorButton = ({
  projectUserId,
  startDate,
  endDate,
  isDisabled,
  selectedUsers,
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
        )}&endDate=${encodeURIComponent(endDate)}`,
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
      showErrorToast(`Error generating PDF`);
    } finally {
      setLoading(false);
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  const dynamicLabel =
    selectedUsers.length === 1
      ? `Generate shifts report - ${selectedUsers[0]?.label}\n(for ${formattedStartDate} - ${formattedEndDate})`
      : `Generate shifts report (for ${formattedStartDate} - ${formattedEndDate})`;

  return (
    <>
      <Box textAlign="center">
        <Button
          size={{ base: 'xs', md: 'sm' }}
          colorScheme="orange"
          type="submit"
          mt={2}
          variant="outline"
          isLoading={loading}
          isDisabled={loading || isDisabled}
          onClick={handleGeneratePdf}
          borderRadius="full"
          maxW="100%"
          minH="2rem"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          {loading ? <Spinner size="sm" /> : dynamicLabel}
        </Button>
      </Box>
    </>
  );
};
export default PdfReportGeneratorButton;
