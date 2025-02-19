import { Box, Text } from '@chakra-ui/react';

type LabelValueProps = {
  label: string;
  value?: string;
};

const LabelValue = ({ label, value }: LabelValueProps) => {
  return (
    <Box mb={2}>
      <Text
        as="span"
        fontWeight="bold"
        whiteSpace="pre-wrap"
        textTransform="uppercase"
      >
        {label}
        {label === '' ? '' : ':'}{' '}
      </Text>
      <Text as="span" whiteSpace="pre-wrap">
        {value}
      </Text>
    </Box>
  );
};

export default LabelValue;
