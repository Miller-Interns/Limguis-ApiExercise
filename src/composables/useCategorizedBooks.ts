import { onMounted } from 'vue';
import { useBooksStore } from '@/store/books-store';

export function useCategorizedBooks() {
	const store = useBooksStore();
	const subjects = [
		'Fiction',
		'Fantasy',
		'Action & Adventure',
		'Classics',
		'Historical Fiction',
		'Science Fiction',
		'Literature',
		'History',
		'Crime & Mystery',
		'Arts & Entertainment',
		'Computers & Technology',
		'Self-Help',
		'Biographies',
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
