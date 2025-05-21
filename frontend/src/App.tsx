import { Flex, useToast, Spinner, Center } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';

import MainContent from './components/MainContent/MainContent.tsx';
import NewEntryModal from './components/Modal/NewEntryModal.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { getJournalEntries, getJournalEntryDetail, createJournalEntry } from './services/api.ts';
import { JournalEntrySummary, JournalEntryDetail } from './types/index.ts';

function App() {
  // --- State for data ---
  const [entries, setEntries] = useState<JournalEntrySummary[]>([]);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [selectedEntryData, setSelectedEntryData] = useState<JournalEntryDetail | null>(null);

  // --- State for UI status ---
  const [isEntriesLoading, setIsEntriesLoading] = useState(true);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- Hooks ---
  const toast = useToast();

  // --- Fetch Initial Entries ---
  const loadEntries = useCallback(async () => {
    setIsEntriesLoading(true);
    try {
      const summaries = await getJournalEntries();
      setEntries(summaries);
    } catch (error) {
      console.error('Failed to load entries', error);
      toast({
        title: 'Error loading entries',
        description: 'Could not fetch journal entries. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setEntries([]);
    } finally {
      setIsEntriesLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  // --- Fetch Detail When Selection Changes ---
  useEffect(() => {
    if (selectedEntryId) {
      const loadDetail = async () => {
        setIsDetailLoading(true);
        setSelectedEntryData(null);
        try {
          const data = await getJournalEntryDetail(selectedEntryId);
          if (data) {
            setSelectedEntryData(data);
          } else {
            toast({
              title: 'Entry not found',
              description: 'Could not load the detais for the selected entry.',
              status: 'warning',
              duration: 3000,
              isClosable: true,
            });
            setSelectedEntryId(null);
          }
        } catch (error) {
          console.error('Failed to load entry detail', error);
          toast({
            title: 'Error loading details',
            description: 'Could not fetch the entry details. Please try again.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          setSelectedEntryId(null);
        } finally {
          setIsDetailLoading(false);
        }
      };
      loadDetail();
    } else {
      setSelectedEntryData(null);
      setIsDetailLoading(false);
    }
  }, [selectedEntryId, toast]);

  // -- Event Handlers ---
  const handleSelectEntry = (id: string) => {
    if (id !== selectedEntryId) {
      setSelectedEntryId(id);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (!isSaving) {
      setIsModalOpen(false);
    }
  };

  const handleSaveEntry = async (title: string, content: string) => {
    setIsSaving(true);
    try {
      const newEntrySummary = await createJournalEntry({ title, content });
      setEntries((prevEntries = []) => [newEntrySummary, ...prevEntries]);
      setSelectedEntryId(newEntrySummary.id);
      setIsModalOpen(false);
      toast({
        title: 'Entry Saved',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Failed to save entry', error);
      toast({
        title: 'Error saving entry',
        description: 'Could not save the new journal entry. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // --- Determine Main Content View State ---
  let mainContentViewState: 'welcome' | 'loading' | 'detail' = 'welcome';
  if (isDetailLoading) {
    mainContentViewState = 'loading';
  } else if (selectedEntryData) {
    mainContentViewState = 'detail';
  }

  // -- Render Logic ---
  return (
    <Flex h="100vh" w="100vw" overflow="hidden">
      {isEntriesLoading ? (
        <Center w="280px" h="100%" bg="gray.50" borderRight="1px solid" borderColor="gray.200">
          <Spinner />
        </Center>
      ) : (
        <Sidebar
          entries={entries}
          selectedEntryId={selectedEntryId}
          onSelectEntry={handleSelectEntry}
          onNewEntryClick={handleOpenModal}
        />
      )}

      <MainContent viewState={mainContentViewState} entryData={selectedEntryData} />

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
        isSaving={isSaving}
      />
    </Flex>
  );
}

export default App;
