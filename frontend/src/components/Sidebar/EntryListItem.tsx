import React from 'react';
import { ListItem, Text } from '@chakra-ui/react';
import { JournalEntrySummary } from '../../types';
// import styles from './EntryListItem.module.css';

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
      borderColor="gray.100"
      cursor="pointer"
      transition="background-color 0.2s ease"
      _hover={{ bg: 'gray.100'}}
      bg={isActive ? 'gray.200' : 'transparent'}
      fontWeight={isActive ? 'bold' : 'normal'}
      onClick={handleClick}
    >
      <Text fontSize="sm" color="gray.800" noOfLines={1} mb={1}>
        {entry.title} / {entry.snippet}
      </Text>
      <Text fontSize="xs" color="gray.500">
        {entry.date}
      </Text>
    </ListItem>
  );
};
 
export default EntryListItem;
