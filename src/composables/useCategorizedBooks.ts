import { onMounted } from 'vue';
import { useBooksStore } from '@/store/books-store';

export function useCategorizedBooks() {
	const store = useBooksStore();
	const subjects = [
		'Fiction',
		'Fantasy',
		'Sci-Fi',
		'Action & Adventure',
		'Crime & Mystery',
		'Classics',
		'Historical Fiction',
		'Arts & Entertainment',
		'Computers & Technology',
		'Self-Help',
		'Biographies',
		'History',
		'Philosophy',
	];

	onMounted(async () => {
		await Promise.all(
			subjects.map((subject) => store.fetchBooksBySubject(subject))
		);
	});

	return {
		store,
		subjects,
	};
}
