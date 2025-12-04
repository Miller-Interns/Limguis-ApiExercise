import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBooksStore } from '@/store/books';
import type { Book } from '@/types';

export function useBookDetails() {
	const route = useRoute();
	const store = useBooksStore();
	const book = ref<Book | null>(null);

	const fetchBook = async (volumeId: string) => {
		book.value = await store.fetchBookById(volumeId);
		return book.value;
	};

	onMounted(async () => {
		const volumeId = route.params.id as string;
		if (volumeId) {
			await fetchBook(volumeId);
		}
	});

	return {
		book,
		store,
		fetchBook,
	};
}
