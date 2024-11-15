import { useState } from 'react';
import { Box, Button, FormLabel, Heading, Spinner } from '@chakra-ui/react';

import { DateInputField, Form, InputField, zod } from '@frontend/shared/forms';

type PdfReportGeneratorProps = {
  projectUserId: string;
  project: {
    startDate: string;
    endDate: string;
  };
  authUser: string;
};

const PdfReportGenerator = ({
  projectUserId,
  authUser,
  project,
}: PdfReportGeneratorProps) => {
  const [loading, setLoading] = useState(false);

  const handleGeneratePdf = async (formValues: FormValues) => {
    const { projectUserId, startDate, endDate } = formValues;

    setLoading(true);

    try {
      // Make the request to the backend API
      const response = await fetch(
        `http://localhost:4000/generate-pdf?projectUserId=${encodeURIComponent(
          projectUserId,
        )}&startDate=${encodeURIComponent(
          startDate.toDateString(),
        )}&endDate=${encodeURIComponent(
          endDate.toDateString(),
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

  const schema = zod.object({
    projectUserId: zod
      .string()
      .min(1, { message: 'You must choose crewmember' }),
    startDate: zod.date(),
    endDate: zod.date(),
  });

  type FormValues = zod.infer<typeof schema>;

  const initialValues: FormValues = {
    projectUserId: projectUserId,
    startDate: new Date(project?.startDate),
    endDate: new Date(project?.endDate),
  };

  return (
    <Box
      maxWidth="500px"
      mx="auto"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="lg" mb="4">
        Generate PDF Report
      </Heading>

      <Form
        onSubmit={(data) => handleGeneratePdf(data)}
        defaultValues={initialValues}
        noValidate
      >
        <FormLabel>Project User ID:</FormLabel>
        <InputField
          name="projectUserId"
          label="Crew id"
          isRequired
          mb={2}
          width="100%"
        />
        <DateInputField name="startDate" label="Start Date" />
        <DateInputField name="endDate" label="End Date" />
        <Button
          colorScheme="orange"
          type="submit"
          mt="4"
          isLoading={loading}
          isDisabled={loading}
        >
          {loading ? <Spinner size="sm" /> : 'Generate PDF'}
        </Button>
      </Form>
    </Box>
  );
};

export default PdfReportGenerator;
