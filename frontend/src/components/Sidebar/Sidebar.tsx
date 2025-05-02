import React from 'react';
import { Box, Button, Heading, List, VStack } from '@chakra-ui/react'
import { JournalEntrySummary } from '../../types';
import EntryListItem from './EntryListItem';
// import styles from './Sidebar.module.css';

interface SidebarProps {
  entries: JournalEntrySummary[];
  selectedEntryId: string | null;
  onSelectEntry: (id: string) => void;
  onNewEntryClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  entries,
  selectedEntryId,
  onSelectEntry,
  onNewEntryClick,
}) => {
  return (
    <Box
      as="aside"
      w="280px"
      h="100%"
      bg="gray.50"
      borderRight="1px solid"
      borderColor="gray.200"
      p={5}
      overflowY="auto"
    >
      <VStack align="stretch" spacing={5}>
        <Heading as="h1" size="lg" color="gray.700">
          My Journal
        </Heading>
        <Button
          onClick={onNewEntryClick}
          bg="gray.200"
          _hover={{ bg: 'gray.300' }}
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
