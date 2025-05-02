import React from 'react';
import { Box, Heading, Text, Spinner, Center, Divider, VStack } from '@chakra-ui/react';
import { JournalEntryDetail } from '../../types';
import MusicRecommendation from './MusicRecommendation';
// import styles from './MainContent.module.css';

type ViewState = 'welcome' | 'loading' | 'detail';

interface MainContentProps {
  viewState: ViewState;
  entryData: JournalEntryDetail | null; // Only needed for 'detail' state
}

const MainContent: React.FC<MainContentProps> = ({ viewState, entryData }) => {
  const renderContent = () => {
    switch (viewState) {
      case 'welcome':
        return (
          <Center h="80%" textAlign="center" color="gray.500" fontSize="lg">
            Select an entry from the left to view it, or click '+ New Entry' to start writing
          </Center>
        );
      case 'loading':
        return (
          <Center h="80%">
            <Spinner size="xl" />
          </Center>
        );
      case 'detail':
        if (!entryData) {
          // Handle error case - should not happen if logic is correct
          return (
            <Center h="80%" color="red.500">
              Error: Entry data missing.
            </Center>
          );
        }
        return (
          <VStack align="stretch" spacing={8}>
            <Box>
              <Heading as="h2" size="xl" mb={4} color="gray.700">
                {entryData.title} / {entryData.date}
              </Heading>
              <Text fontSize="md" lineHeight="tall" color="gray.600" whiteSpace="pre-wrap">
                {entryData.content}
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h3" size="lg" mb={6} color="gray.700">
                Music Recommendations
              </Heading>
              {entryData.recommendations.length > 0 ? (
                <VStack align="stretch" spacing={5}>
                  {entryData.recommendations.map((rec) => (
                    <MusicRecommendation key={rec.id} recommendation={rec} />
                  ))}
                </VStack>
              ) : (
                <Text color="gray.500">No recommendations available for this entry yet.</Text>
              )}
            </Box>
          </VStack>
        );
      default:
        return null; // Should not happen
    }
  };

  return (
    <Box as="main" flexGrow={1} h="100%" p={10} overflowY="auto" bg="white">
      {renderContent()}
    </Box>
  );
};

export default MainContent;
