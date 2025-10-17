export interface Note {
  id: number;
  title: string;
  content: string;
  tag?: string;
  createdAt: string;
}

export interface PaginatedNotesResponse {
  items: Note[];
  total: number;
  page: number;
  perPage: number;
}
