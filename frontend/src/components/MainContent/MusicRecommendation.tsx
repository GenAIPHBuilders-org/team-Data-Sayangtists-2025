import React from 'react';
import { Box, Flex, Heading, Text, Image, Circle } from '@chakra-ui/react';
import { MusicRecommendationData } from '../../types';
// import styles from './MusicRecommendation.module.css';

interface MusicRecommendationProps {
  recommendation: MusicRecommendationData;
}

const MusicRecommendation: React.FC<MusicRecommendationProps> = ({ recommendation }) => {
  return (
    <Flex align="center" bg="gray.50" p={4} borderRadius="md">
      <Box w="80px" h="80px" bg="gray.300" borderRadius="sm" mr={5}>
        {recommendation.imageUrl && (
          <Image
            src={recommendation.imageUrl}
            alt={recommendation.title}
            boxSize="80px"
            objectFit="cover"
            borderRadius="sm"
          />
        )}
      </Box>
      <Box flexGrow={1}>
        <Heading as="h4" size="sm" mb={1} color="gray.700">
          {recommendation.title}
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={2}>
          {recommendation.artist}
        </Text>
        <Flex align="center">
          <Text fontSize="xs" color="gray.500" mr={2}>
            Listen on...
          </Text>
          <Circle size="12px" bg="gray.400" mr={1} />
          <Circle size="12px" bg="gray.400" mr={1} />
          <Circle size="12px" bg="gray.400" />
        </Flex>
      </Box>
    </Flex>
  );
};

export default MusicRecommendation;
