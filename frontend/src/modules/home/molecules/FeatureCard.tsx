import { Box, Heading, Image, Text } from '@chakra-ui/react';

interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const FeatureCard = ({ title, description, imageUrl }: FeatureCardProps) => (
  <Box
    flex="1"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    display="flex"
    flexDirection={{ base: 'column', lg: 'row' }}
    p={4}
    my={3}
  >
    <Box
      flex="0 0 30%"
      justifyContent="center"
      alignItems="left"
      textAlign={{ base: 'center', lg: 'left' }}
      display="flex"
      flexDirection="column"
      px={5}
      pb={3}
    >
      <Heading as="h3" fontSize="4xl" fontWeight="bold">
        {title}
      </Heading>
      <Text fontSize="xl" color="gray.300">
        {description}
      </Text>
    </Box>
    <Box
      flex="0 0 70%"
      justifyContent="center"
      alignItems="center"
      textAlign="left"
      display="flex"
      flexDirection="column"
    >
      <Image
        src={imageUrl}
        width="100%"
        alt={`${title} screenshot`}
        height="auto"
        maxWidth={{ base: '650px', lg: '700px' }}
        style={{
          boxShadow: '-1px 42px 32px -40px rgba(255,255,255,0.49)',
        }}
      />
    </Box>
  </Box>
);

export default FeatureCard;
