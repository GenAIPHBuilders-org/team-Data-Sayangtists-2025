import React from 'react';
import { MusicRecommendationData } from '../../types';
import styles from './MusicRecommendation.module.css';

interface MusicRecommendationProps {
  recommendation: MusicRecommendationData;
}

const MusicRecommendation: React.FC<MusicRecommendationProps> = ({ recommendation }) => {
  return (
    <div className={styles.recommendationItem}>
      <div className={styles.albumArt}>
        {/* Placeholder for actual image later */}
        {recommendation.imageUrl && <img src={recommendation.imageUrl} alt={recommendation.title} width="80" height="80" />}
      </div>
      <div className={styles.trackInfo}>
        <div className={styles.trackTitle}>{recommendation.title}</div>
        <div className={styles.artistName}>{recommendation.artist}</div>
        <div className={styles.listenOn}>
          Listen on...
          {/* Placeholder for service icons */}
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  );
};

export default MusicRecommendation;
