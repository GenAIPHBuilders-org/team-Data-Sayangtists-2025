import { ListItem, Text } from '@chakra-ui/react';
import React from 'react';

import { JournalEntrySummary } from '../../types/index.ts';

interface EntryListItemProps {
  entry: JournalEntrySummary;
  isActive: boolean;
  onSelect: (id: string) => void;
}

const EntryListItem: React.FC<EntryListItemProps> = ({ entry, isActive, onSelect }) => {
  const handleClick = () => {
    onSelect(entry.id);
  };

  return (
    <ListItem
      p={4}
      borderBottom="1px solid"
      borderColor="gray.200"
      cursor="pointer"
      transition="background-color 0.2s ease, color 0.2s ease"
      _hover={{ bg: isActive ? 'brand.100' : 'brand.50' }}
      bg={isActive ? 'brand.100' : 'transparent'}
      color={isActive ? 'brand.700' : 'text.primary'}
      fontWeight={isActive ? 'bold' : 'normal'}
      onClick={handleClick}
      borderRadius='md'
      mb={1}
    >
      <Text fontSize="sm" noOfLines={1} mb={1} color={isActive ? 'brand.800' : 'text.primary'}>
        {entry.title} / {entry.snippet}
      </Text>
      <Text fontSize="xs" color={isActive ? 'brand.600' : 'text.secondary'}>
        {entry.entry_date}
      </Text>
    </ListItem>
  );
};

export default EntryListItem;
