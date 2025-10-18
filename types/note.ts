export const TAGS = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
] as const;

export type NoteTag = (typeof TAGS)[number];

export interface Note {
  id: number;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
}

export interface PaginatedNotesResponse {
  notes: Note[];
  totalPages: number;
}
