import React from 'react';
import { Box } from '@chakra-ui/react';

import { Heading } from '@frontend/shared/design-system';

import FeatureCard from '../atoms/FeatureCard';

const AppFeatures = () => {
  return (
    <>
      <Heading
        as="h2"
        fontSize="5xl"
        textAlign="center"
        fontWeight="bold"
        bgGradient="linear(to-r, orange.400, orange.600)"
        bgClip="text"
        pb={3}
      >
        Features That Make Filmmaking Easier
      </Heading>

      <Box
        width={{ base: '100%', md: '85%' }}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        display="flex"
        flexDirection="column"
      >
        <FeatureCard
          title="Shift Time Tracking"
          description="Easily report your work hours from the film set with just a few clicks. Track shifts quickly and clearly on any device, making time logging simple, fast, and accessible anywhere."
          imageUrl="/component_1.png"
        />
        <FeatureCard
          title="Crew Management"
          description="Manage your entire crew and departments with ease. Update member info, set hourly and overtime rates, and vehicle mileage allowances — all from a single, user-friendly platform."
          imageUrl="/component_2.png"
        />
        <FeatureCard
          title="Project Overview"
          description="Get a clear overview of your project details, including shooting days, worked shifts, overtime costs, and mileage. Stay on top of every aspect of your production with simplicity and accuracy."
          imageUrl="/component_3.png"
        />
        <FeatureCard
          title="Comprehensive Reports"
          description="Generate daily production reports, as well as timesheets for individuals, departments, and crews. Export mileage summaries and detailed timesheets for invoicing, all through customizable, comprehensive reports."
          imageUrl="/component_4.png"
        />
      </Box>
    </>
  );
};

export default AppFeatures;
