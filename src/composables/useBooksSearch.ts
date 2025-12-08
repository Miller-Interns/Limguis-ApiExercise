import { ref, computed } from 'vue';
import { useBooksStore } from '@/store/books-store';

export function useBooksSearch() {
	const store = useBooksStore();
	const localQuery = ref('');

	const performSearch = (query: string) => {
		store.setQuery(query);
		store.startIndex = 0; // Reset to first page
		store.fetchBooks();
	};

	const hasNextPage = computed(() => store.books.length === store.maxResults);

	// pagination helpers - expose to templates so consumers don't need to rely on store's internal typings
	const currentPage = computed(() => store.currentPage);
	const nextPage = () => store.nextPage();
	const previousPage = () => store.previousPage();

	return {
		localQuery,
		performSearch,
		hasNextPage,
		currentPage,
		nextPage,
		previousPage,
		store,
	};
}
