import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBooksStore } from '@/store/books-store';
import type { Book } from '@/types';

export function useBookDetails() {
	const route = useRoute();
	const store = useBooksStore();
	const book = ref<Book | null>(null);

	const fetchBook = async (volumeId: string) => {
		book.value = await store.fetchBookById(volumeId);
		return book.value;
	};

	const updateBook = async () => {
		const volumeId = route.params.id as string;
		if (volumeId) {
			await fetchBook(volumeId);
		}
	};

	onMounted(updateBook);

	watch(() => route.params.id, updateBook);

	return {
		book,
		store,
		fetchBook,
	};
}
