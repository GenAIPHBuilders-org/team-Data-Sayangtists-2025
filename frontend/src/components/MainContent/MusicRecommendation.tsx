import { Box, Flex, Heading, Text, Image } from '@chakra-ui/react';
import React from 'react';

import { MusicRecommendationData } from '../../types/index.ts';
import { SpotifyIcon, AppleMusicIcon, YoutubeMusicIcon } from "../Icons";

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
          <Text fontSize="xs" color="text.secondary" mr={3}>
            Listen on...
          </Text>
          <Box as='a' href='#' target='_blank' rel='noopener noreferrer' mr={2}>
            <SpotifyIcon boxSize='20px' cursor='pointer' _hover={{ opacity: 0.7 }} />
          </Box>
          <Box as='a' href='#' target='_blank' rel='noopener noreferrer' mr={2}>
            <AppleMusicIcon boxSize='20px' cursor='pointer' _hover={{ opacity: 0.7 }} />
          </Box>
          <Box as='a' href='#' target='_blank' rel='noopener noreferrer'>
            <YoutubeMusicIcon boxSize='20px' cursor='pointer' _hover={{ opacity: 0.7 }} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default MusicRecommendation;
