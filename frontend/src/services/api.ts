import axios from 'axios';

import { JournalEntrySummary, JournalEntryDetail } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- API Function Definitions ---

/**
 * Fetches a list of journal entry summaries.
 */
export const getJournalEntries = async (): Promise<JournalEntrySummary[]> => {
  try {
    const response = await apiClient.get<JournalEntrySummary[]>('/entries/');
    return response.data;
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

/**
 * Fetches the detailed content and recommendations for a specific entry.
 * @param id The ID of the journal entry.
 */
export const getJournalEntryDetail = async (id: string): Promise<JournalEntryDetail | null> => {
  try {
    const response = await apiClient.get<JournalEntryDetail>(`/entries/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entry detail for ID ${id}:`, error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

/**
 * Creates a new journal entry.
 * @param data Object containing title and content.
 */
export const createJournalEntry = async (data: {
  title: string;
  content: string;
}): Promise<JournalEntrySummary> => {
  try {
    const response = await apiClient.post<JournalEntrySummary>('/entries/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};
