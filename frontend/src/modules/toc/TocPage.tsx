import { Box, Divider, Text } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';
import Footer from '@frontend/shared/navigation/components/footer/Footer';
import Navbar from '@frontend/shared/navigation/components/navbar/Navbar';

export function ToCPage() {
  return (
    <Box>
      <Navbar children={undefined} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        //   height="100vh"
        bg="#F7FAFC"
        p={{ base: 0, sm: 4, md: 8, xl: 8 }}
      >
        <Box
          w="100%"
          maxW={{ md: '650px', xl: '800px' }}
          p="6"
          borderRadius="md"
          borderWidth={1}
          boxShadow="md"
          bg="white"
        >
          <Text textAlign="justify">
            <Heading as="h1" size="xl" mt="5px" mb="10px" textAlign="left">
              Terms of Use for the ReelTiming Application
            </Heading>
            <Text fontSize="md" color="gray.600" mb="4">
              Effective from October 12, 2024
            </Text>
            <Divider mb="4" />

            <Heading as="h2" size="md" mt="10px" mb="5px">
              1. Acceptance of Terms
            </Heading>
            <Text>
              By using, accessing the application, or any involvement in the
              process of reporting work hours through the film crew application
              (hereinafter referred to as "Application"), you agree that you
              unconditionally accept the following terms of use (hereinafter
              referred to as "Agreement"), regardless of your understanding,
              reading, or clarity of individual provisions. By continuing to use
              the Application, you confirm your irrevocable consent to the
              current version of these terms, which may be amended, changed, or
              revised at the sole discretion of the operator of the Application
              at any time.
            </Text>

            <Heading as="h2" size="md" mt="10px" mb="5px">
              2. Reporting Data and Its Accuracy
            </Heading>
            <Text>
              Users (hereinafter referred to as "You" or "User") acknowledge
              that all records of work hours, reports, data entries, or any
              other information entered into the Application are the sole
              responsibility of the user. The Application does not verify,
              confirm, guarantee, or ensure the accuracy, timeliness, or
              completeness of the entered data. Any errors, omissions, or
              incorrect reporting of work hours are the sole responsibility of
              the User, and the Application assumes no responsibility for
              resolving discrepancies or disputes arising in this regard.
            </Text>

            <Heading as="h2" size="md" mt="10px" mb="5px">
              3. Exclusion of Liability to Third Parties
            </Heading>
            <Text>
              The Application, its owners, operators, or affiliates shall not be
              liable for any direct, indirect, incidental, consequential, or
              special damages, including but not limited to disputes arising
              from contractual obligations, employment relationships, legal
              actions, or financial consequences that arise from the use of the
              Application or in connection with it. The Application does not
              guarantee any problems, damages, or complications caused by third
              parties, including but not limited to external service providers,
              employers, clients, or other entities outside the direct control
              of the Application.
            </Text>

            <Heading as="h2" size="md" mt="10px" mb="5px">
              4. Changes to Terms
            </Heading>
            <Text>
              The operator of the Application reserves the right to change,
              modify, or supplement these Terms of Use at any time without prior
              notice at its discretion. The User is obligated to regularly check
              the current wording of these terms, and any continued use of the
              Application after changes will be considered explicit consent to
              these changes. The Application is not responsible for the User not
              being informed about changes if they do not familiarize themselves
              properly with them.
            </Text>

            <Heading as="h2" size="md" mt="10px" mb="5px">
              5. Dispute Resolution
            </Heading>
            <Text>
              Any disputes arising under these terms or in connection with the
              use of the Application shall be resolved exclusively according to
              the valid law of the Czech Republic at the competent courts, with
              the User agreeing to the local jurisdiction of the courts in the
              place of residence of the operator of the Application.
            </Text>
          </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
