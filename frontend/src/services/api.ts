import axios from 'axios';

import { JournalEntrySummary, JournalEntryDetail } from '../types';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- API Function Definitions ---

/**
 * Fetches a list of journal entry summaries.
 */
export const getJournalEntries = async (): Promise<JournalEntrySummary[]> => {
  // TODO: Replace with actual API call
  console.warn('API CALL MOCKED: getJournalEntries');
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [
    { id: '1', title: 'Great Day (API Mock)', snippet: 'Went for a walk...', date: 'May 1, 2025' },
    {
      id: '2',
      title: 'Thoughtful (API Mock)',
      snippet: 'Thinking about the project...',
      date: 'May 2, 2025',
    },
    {
      id: '3',
      title: 'Weekend Plans (API Mock',
      snippet: 'Looking forward to...',
      date: 'Apr 23, 2025',
    },
  ];
  /** Actual API call structure:
   * try {
   *   const response = await apiClient.get('/entries');
   *   return response.data; // Assuming back returns JournalEntrySummary[]
   * } catch (error) {
   *   console.error('Error fetching journal entries:', error);
   *   throw error; // Re-throw to be caught by the calling component
   * }
   */
};

/**
 * Fetches the detailed content and recommendations for a specific entry.
 * @param id The ID of the journal entry.
 */
export const getJournalEntryDetail = async (id: string): Promise<JournalEntryDetail | null> => {
  // TODO: Replace with actual API call
  console.warn(`API CALL MOCKED: getJournalEntryDetail for ID: ${id}`);
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockEntriesSummary = [
    { id: '1', title: 'Great Day (API Mock)', snippet: 'Went for a walk...', date: 'Apr 25, 2025' },
    {
      id: '2',
      title: 'Thoughtful (API Mock)',
      snippet: 'Thinking about the project...',
      date: 'Apr 24, 2025',
    },
    {
      id: '3',
      title: 'Weekend Plans (API Mock)',
      snippet: 'Looking forward to...',
      date: 'Apr 23, 2025',
    },
  ];
  const mockRecommendations = [
    { id: 'rec1', title: 'Weightless', artist: 'Marconi Union', imageUrl: undefined },
    { id: 'rec2', title: 'Teardrop', artist: 'Massive Attack', imageUrl: undefined },
  ];
  const summary = mockEntriesSummary.find((entry) => entry.id === id);
  if (!summary) return null;

  let content = `This is the full content for entry "${summary.title}".\n\nReplace this with actual fetched content based on the ID. (Fetched from API Mock Service)`;
  let recommendations = mockRecommendations;
  if (id === '2') {
    content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec molestie turpis. Nam semper laoreet elit, vel faucibus leo blandit scelerisque. Ut tempor odio nunc, porta bibendum nibh vehicula dapibus. Proin sed orci id lacus rhoncus iaculis et ac velit. Curabitur commodo sagittis ante, eget molestie sem. Pellentesque aliquet ex blandit, consequat dui eu, tempor quam. Integer ut enim ullamcorper, feugiat ante ac, eleifend diam. Nulla id tellus metus. Donec magna metus, finibus in interdum eget, hendrerit sed nisi.`;
    recommendations = [
      { id: 'rec3', title: 'luther (with SZA)', artist: 'Kendrick Lamar', imageUrl: undefined },
      { id: 'rec4', title: 'Good Luck, Babe!', artist: 'Chappell Roan', imageUrl: undefined },
    ];
  }
  return { ...summary, content, recommendations };
  /** Actual API call structure:
   * try {
   *   const response = await apiClient.get(`/entries/${id}`);
   *   return response.data; // Assuming backend returns JournalEntryDetail or null
   * } catch (error) {
   *   console.error(`Error fetching entry detail for ID ${id}:`, error);
   *   if (axios.isAxiosError(error) && error.response?.status === 404) {
   *     return null; // Or handle 404 specifically
   *   }
   *   throw error; // Re-throw for other errors
   * }
   */
};

/**
 * Creates a new journal entry.
 * @param data Object containing title and content.
 */
export const createJournalEntry = async (data: {
  title: string;
  content: string;
}): Promise<JournalEntrySummary> => {
  // TODO: Replace with actual API call
  console.warn('API CALL MOCKED: createJournalEntry', data);
  await new Promise((resolve) => setTimeout(resolve, 700));

  const newEntrySummary: JournalEntrySummary = {
    id: Date.now().toString(),
    title: data.title + ' (Mock Saved)',
    snippet: data.content.substring(0, 30) + '...',
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  };
  return newEntrySummary;
  /** Actual API call structure:
   * try {
   *   const response = await apiClient.post('/entries', data);
   *   return response.data;
   * } catch (error) {
   *   console.error('Error creating journal entry:', error);
   *   throw error;
   * }
   */
};
