import { onMounted } from 'vue';
import { useBooksStore } from '@/store/books-store';

/**
 * Composable for managing categorized books data.
 * Fetches books for multiple subjects.
 */
export function useCategorizedBooks() {
	const store = useBooksStore();
	const subjects = [
		'Fiction & Literature',
		'History',
		'Computers & Technology',
		'Biographies',
	];

	onMounted(async () => {
		// Fetch books for each subject
		await Promise.all(
			subjects.map((subject) => store.fetchBooksBySubject(subject))
		);
	});

	return {
		store,
		subjects,
	};
}
