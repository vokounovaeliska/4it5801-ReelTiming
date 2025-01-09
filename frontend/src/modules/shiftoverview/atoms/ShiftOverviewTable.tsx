import { Box } from '@chakra-ui/react';

import { GetShiftOverviewPageDataQuery } from '@frontend/gql/graphql';
import { Heading } from '@frontend/shared/design-system';

type Props = {
  data?: GetShiftOverviewPageDataQuery;
};

export const ShiftOverviewTable = ({ data }: Props) => {
  return (
    <Box>
      <Box flex="1">
        <Heading as="h3" pb={4} pl={4}>
          Shift overview {data?.project?.name}
        </Heading>
      </Box>
    </Box>
  );
};
