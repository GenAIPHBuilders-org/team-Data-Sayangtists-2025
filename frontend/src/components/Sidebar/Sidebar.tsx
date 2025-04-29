import React from 'react';
import { JournalEntrySummary } from '../../types';
import EntryListItem from './EntryListItem';
import styles from './Sidebar.module.css';

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
    <aside className={styles.sidebar}>
      <h1 className={styles.title}>My Journal</h1>
      <button className={styles.newEntryButton} onClick={onNewEntryClick}>
        + New Entry
      </button>
      <ul className={styles.entryList}>
        {entries.map((entry) => (
          <EntryListItem
            key={entry.id}
            entry={entry}
            isActive={entry.id === selectedEntryId}
            onSelect={onSelectEntry}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
