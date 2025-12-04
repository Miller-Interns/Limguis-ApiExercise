import { useBooksStore } from '@/store/books';

export const useBooks = () => {
	const store = useBooksStore();

	const searchBooks = async (query: string, page: number = 1) => {
		store.setQuery(query);
		store.startIndex = (page - 1) * store.maxResults;
		await store.fetchBooks();
	};

	const goToNextPage = () => {
		store.nextPage();
	};

	const goToPreviousPage = () => {
		store.previousPage();
	};

	const fetchBook = async (volumeId: string) => {
		return await store.fetchBookById(volumeId);
	};

	return {
		searchBooks,
		goToNextPage,
		goToPreviousPage,
		fetchBook,
		store,
	};
};
