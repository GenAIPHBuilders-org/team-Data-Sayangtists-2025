export interface JournalEntrySummary {
  id: string;
  title: string;
  snippet: string; // First line or generated snippet
  date: string; // Or Date object, formatting handled in component
}

export interface MusicRecommendationData {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string; // Optional image URL
  // TODO: Add links or playback info
}

export interface JournalEntryDetail extends JournalEntrySummary {
  content: string;
  recommendations: MusicRecommendationData[];
}
