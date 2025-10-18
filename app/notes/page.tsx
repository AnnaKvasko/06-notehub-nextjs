import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type PageProps = {
  searchParams: Promise<{ page?: string; search?: string }>;
};

export default async function NotesPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const page = Number(sp.page ?? 1);
  const search = sp.search ?? '';
  const perPage = 12;

  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', { page, search, perPage }],
    queryFn: () => fetchNotes({ page, perPage, search }),
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesClient
        initialPage={page}
        initialSearch={search}
        perPage={perPage}
      />
    </HydrationBoundary>
  );
}
