import { Box, Flex, Heading, Text, Image, Circle } from '@chakra-ui/react';
import React from 'react';

import { MusicRecommendationData } from '../../types/index.ts';
// import styles from './MusicRecommendation.module.css';

interface MusicRecommendationProps {
  recommendation: MusicRecommendationData;
}

const MusicRecommendation: React.FC<MusicRecommendationProps> = ({ recommendation }) => {
  return (
    <Flex align="center" bg="background.secondary" p={4} borderRadius="md" boxShadow="md">
      <Box w="80px" h="80px" bg="gray.100" borderRadius="sm" mr={5} display="flex" alignItems="center" justifyContent="center">
        {recommendation.metadata?.image_url ? (
          <Image
            src={recommendation.metadata.image_url}
            alt={recommendation.rec_name}
            boxSize="80px"
            objectFit="cover"
            borderRadius="sm"
          />
        ) : (
          <Text fontSize="2xl" color="gray.400">🎵</Text>
        )}
      </Box>
      <Box flexGrow={1}>
        <Heading as="h4" size="md" mb={1} color="text.primary">
          {recommendation.rec_name}
        </Heading>
        <Text fontSize="sm" color="text.secondary" mb={2}>
          {recommendation.artist}
        </Text>
        <Flex align="center">
          <Text fontSize="xs" color="text.secondary" mr={2}>
            Listen on...
          </Text>
          <Circle size="20px" bg="brand.400" mr={2} cursor="pointer" _hover={{ bg: 'brand.500' }} />
          <Circle size="20px" bg="brand.400" mr={2} cursor="pointer" _hover={{ bg: 'brand.500' }} />
          <Circle size="20px" bg="brand.400" mr={2} cursor="pointer" _hover={{ bg: 'brand.500' }} />
        </Flex>
      </Box>
    </Flex>
  );
};

export default MusicRecommendation;
