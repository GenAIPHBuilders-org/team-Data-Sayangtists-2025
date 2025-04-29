import React from 'react';
import { JournalEntryDetail } from '../../types';
import MusicRecommendation from './MusicRecommendation';
import styles from './MainContent.module.css';

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
          <div className={styles.placeholder}>
            Select an entry from the left to view it, or click '+ New Entry' to start writing
          </div>
        );
      case 'loading':
        return (
          <div className={styles.placeholder}>
            <div className={styles.loadingSpinner}></div>
          </div>
        );
      case 'detail':
        if (!entryData) {
          // Handle error case - should not happen if logic is correct
          return <div className={styles.placeholder}>Error: Entry data missing.</div>;
        }
        return (
          <div>
            <h2 className={styles.entryDetailTitle}>{entryData.title} / {entryData.date}</h2>
            <p className={styles.entryDetailContent}>{entryData.content}</p>
            <div className={styles.recommendationsSection}>
              <h3 className={styles.recommendationsTitle}>Music Recommendation</h3>
              {entryData.recommendations.length > 0 ? (
                entryData.recommendations.map((rec) => (
                  <MusicRecommendation key={rec.id} recommendation={rec} />
                ))
              ) : (
                <p>No recommendations available for this entry yet.</p>
              )}
            </div>
          </div>
        );
      default:
        return null; // Should not happen
    }
  };

  return <main className={styles.mainContent}>{renderContent()}</main>;
};

export default MainContent;
