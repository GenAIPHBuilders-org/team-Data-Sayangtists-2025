import { Box, Button, Heading, List, VStack } from '@chakra-ui/react';
import React from 'react';

import EntryListItem from './EntryListItem.tsx';
import { JournalEntrySummary } from '../../types/index.ts';

interface SidebarProps {
  entries?: JournalEntrySummary[];
  selectedEntryId: string | null;
  onSelectEntry: (id: string) => void;
  onNewEntryClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  entries = [],
  selectedEntryId,
  onSelectEntry,
  onNewEntryClick,
}) => {
  return (
    <Box
      as="aside"
      w="280px"
      h="100%"
      bg="background.secondary"
      borderRight="1px solid"
      borderColor="gray.200"
      p={5}
      overflowY="auto"
    >
      <VStack align="stretch" spacing={5}>
        <Heading as="h1" size="lg" color="text.primary">
          My Journal
        </Heading>
        <Button
          onClick={onNewEntryClick}
          colorScheme="brand"
          fontWeight="normal"
        >
          + New Entry
        </Button>
        <List spacing={0} flexGrow={1}>
          {entries.map((entry) => (
            <EntryListItem
              key={entry.id}
              entry={entry}
              isActive={entry.id === selectedEntryId}
              onSelect={onSelectEntry}
            />
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Sidebar;
