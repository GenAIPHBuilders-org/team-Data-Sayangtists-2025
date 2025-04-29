import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import MainContent from './components/MainContent/MainContent';
import NewEntryModal from './components/Modal/NewEntryModal';
import { JournalEntrySummary, JournalEntryDetail, MusicRecommendationData } from './types';
import styles from './App.module.css';

// --- Mock Data (Replace with API calls soon) ---
const mockEntriesSummary: JournalEntrySummary[] = [
  { id: '1', title: 'Great Day', snippet: 'Went for a walk...', date: 'Apr 29, 2025' },
  { id: '2', title: 'Feeling Thoughtful', snippet: 'Thinking about the project...', date: 'Apr 28, 2025' },
  { id: '3', title: 'Weekend Plans', snippet: 'Looking forward to relaxing...', date: 'Apr 27, 2025' },
];

const mockRecommendations: MusicRecommendationData[] = [
    { id: 'rec1', title: 'party 4 u', artist: 'Charli xcx', imageUrl: undefined },
    { id: 'rec2', title: 'WALK', artist: 'Playboi Carti', imageUrl: undefined },
];

// Simulate fetching detailed entry data
const fetchEntryDetail = async (id: string): Promise<JournalEntryDetail | null> => {
    console.log(`Simulating fetch for entry ID: ${id}`);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 second

    const summary = mockEntriesSummary.find(entry => entry.id === id);
    if (!summary) return null;

    // In a real app, fetch content and recommendations based on ID
    let content = `This is the full content for entry "${summary.title}".\n\nReplace this with actual fetched content based on the ID. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.`;
    let recommendations = mockRecommendations; // Use mock recommendations for all for now

    if (id === '2') {
         content = `Thinking about the AI Journal project. It's exciting but challenging.\nNeed to figure out the best way to map sentiment to music genres effectively. Considering using mood tags from the music API directly.`;
         // Different recommendations for entry 2
         recommendations = [
            { id: 'rec3', title: 'luther (with SZA)', artist: 'Kendrick Lamar', imageUrl: undefined },
            { id: 'rec4', title: 'Pyramids', artist: 'Frank Ocean', imageUrl: undefined },
         ];
    }


    return {
        ...summary,
        content: content,
        recommendations: recommendations, // TODO: Add recommendations based on ID
    };
};
// --- End Mock Data ---


function App() {
  const [entries, setEntries] = useState<JournalEntrySummary[]>(mockEntriesSummary);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [selectedEntryData, setSelectedEntryData] = useState<JournalEntryDetail | null>(null);
  const [mainContentView, setMainContentView] = useState<'welcome' | 'loading' | 'detail'>('welcome');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to load entry details when selection changes
  useEffect(() => {
    if (selectedEntryId) {
      setMainContentView('loading');
      setSelectedEntryData(null); // Clear previous data while loading
      fetchEntryDetail(selectedEntryId).then(data => {
        if (data) {
          setSelectedEntryData(data);
          setMainContentView('detail');
        } else {
          // Handle error: entry not found
          console.error("Entry not found!");
          setSelectedEntryId(null); // Reset selection
          setMainContentView('welcome'); // TODO: Decide if go back to welcome or show error message
        }
      });
    } else {
      setMainContentView('welcome');
      setSelectedEntryData(null);
    }
  }, [selectedEntryId]); // Re-run effect when selectedEntryId changes


  const handleSelectEntry = (id: string) => {
    setSelectedEntryId(id);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEntry = (title: string, content: string) => {
    console.log('Saving new entry:', { title, content });
    // TODO: Implement actual save logic (API call)
    // For now, just add to mock data and refresh UI slightly
    const newEntrySummary: JournalEntrySummary = {
        id: Date.now().toString(), // Simple temporary ID
        title: title,
        snippet: content.substring(0, 30) + '...', // Simple snippet
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setEntries(prevEntries => [newEntrySummary, ...prevEntries]); // Add to top of list
    setSelectedEntryId(newEntrySummary.id); // Select the newly added entry
    // The useEffect hook will handle loading its detail view
    // Note: Fetching detail for this mock entry won't work correctly without backend
    console.warn("Mock save complete. Detail view may not load correctly without backend integration.");
  };

  return (
    <div className={styles.appLayout}>
      <Sidebar
        entries={entries}
        selectedEntryId={selectedEntryId}
        onSelectEntry={handleSelectEntry}
        onNewEntryClick={handleOpenModal}
      />
      <MainContent
        viewState={mainContentView}
        entryData={selectedEntryData}
      />
      <NewEntryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEntry}
      />
    </div>
  );
}

export default App;
