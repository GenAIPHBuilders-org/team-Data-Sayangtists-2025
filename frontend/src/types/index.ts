export interface JournalEntrySummary {
  id: string;
  title: string;
  snippet: string; // First line or generated snippet
  entry_date: string; // Or Date object, formatting handled in component
}

export interface MusicRecommendationData {
  id: string;
  rec_name: string;
  artist: string;
  metadata?: {
    image_url?: string,
  }
  // TODO: Add links or playback info
}

export interface JournalEntryDetail extends JournalEntrySummary {
  content: string;
  recommendations: MusicRecommendationData[];
}
