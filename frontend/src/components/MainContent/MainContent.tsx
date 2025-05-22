import { Box, Heading, Text, Spinner, Center, Divider, VStack } from '@chakra-ui/react';
import React from 'react';

import MusicRecommendation from './MusicRecommendation.tsx';
import { JournalEntryDetail } from '../../types/index.ts';
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
          <Center h="80%" textAlign="center" color="text.secondary" fontSize="lg">
            Select an entry from the left to view it, or click &lsquo;+ New Entry&rsquo; to start
            writing
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
              <Heading as="h2" size="xl" mb={4} color="text.primary">
                {entryData.title} / {new Date(entryData.entry_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </Heading>
              <Text fontSize="md" lineHeight="tall" color="text.primary" whiteSpace="pre-wrap">
                {entryData.content}
              </Text>
            </Box>

            <Divider borderColor="gray.300" />

            <Box>
              <Heading as="h3" size="lg" mb={6} color="text.primary">
                Music Recommendations
              </Heading>
              {entryData.recommendations.length > 0 ? (
                <VStack align="stretch" spacing={5}>
                  {entryData.recommendations.map((rec) => (
                    <MusicRecommendation key={rec.id} recommendation={rec} />
                  ))}
                </VStack>
              ) : (
                <Text color="text.secondary">No recommendations available for this entry yet.</Text>
              )}
            </Box>
          </VStack>
        );
      default:
        return null; // Should not happen
    }
  };

  return (
    <Box as="main" flexGrow={1} h="100%" p={8} overflowY="auto" bg="white">
      {renderContent()}
    </Box>
  );
};

export default MainContent;
