import React from 'react';
import { JournalEntrySummary } from '../../types';
import styles from './EntryListItem.module.css';

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
    <li
      className={`${styles.listItem} ${isActive ? styles.active : ''}`}
      onClick={handleClick}
    >
      <div className={styles.itemTitle}>{entry.title} / {entry.snippet}</div>
      <div className={styles.itemDate}>{entry.date}</div>
    </li>
  );
};

export default EntryListItem;
