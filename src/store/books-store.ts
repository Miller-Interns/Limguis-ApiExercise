import { defineStore } from 'pinia';
import type { Book } from '@/types';

export const useBooksStore = defineStore('books', {
	state: () => ({
		books: [] as Book[],
		featuredBooks: [] as Book[],
		categorizedBooks: {} as Record<string, Book[]>,
		totalItems: 0,
		query: '',
		lastQuery: localStorage.getItem('lastQuery') || '',
		startIndex: 0,
		featuredStartIndex: 0,
		maxResults: 20,
		selectedBook: null as Book | null,
		loading: false,
		error: '',
		featuredLoading: false,
		featuredError: '',
		featuredLastFetched: 0,
	}),
	getters: {
		currentPage: (state) => Math.floor(state.startIndex / state.maxResults) + 1,
	},
	actions: {
		setQuery(newQuery: string) {
			this.lastQuery = newQuery;
			this.query = newQuery;
			localStorage.setItem('lastQuery', newQuery);
		},

		async fetchBooks() {
			if (!this.query.trim()) return;

			this.loading = true;
			this.error = '';

			try {
				const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
					this.query
				)}&startIndex=${this.startIndex}&maxResults=${this.maxResults}`;

				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch books');

				const data = await response.json();
				let fetchedBooks = data.items || [];
				this.totalItems = data.totalItems || 0;

				// Filter books to only include those where the query is in the title
				const queryLower = this.query.toLowerCase();
				this.books = fetchedBooks.filter((book: Book) => {
					const fullTitle =
						`${book.volumeInfo.title} ${book.volumeInfo.subtitle || ''}`.toLowerCase();
					return fullTitle.includes(queryLower);
				});
			} catch (err) {
				this.error = err instanceof Error ? err.message : 'An error occurred';
				this.books = [];
				this.totalItems = 0;
			} finally {
				this.loading = false;
			}
		},

		async fetchFeatured(query = 'fiction') {
			if (!query.trim()) return;

			this.featuredLoading = true;
			this.featuredError = '';

			try {
				const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
					query
				)}&startIndex=${this.featuredStartIndex}&maxResults=${this.maxResults}&langRestrict=en`;

				const response = await fetch(url);
				if (!response.ok) throw new Error('Failed to fetch featured books');

				const data = await response.json();
				this.featuredBooks = data.items || [];

				// Shuffle the featured books for randomization
				this.featuredBooks = this.featuredBooks.sort(() => Math.random() - 0.5);

				this.featuredLastFetched = Date.now();

				// persist latest featured payload to localStorage so catalogue survives reloads
				try {
					localStorage.setItem(
						'books-featured',
						JSON.stringify({
							featuredBooks: this.featuredBooks,
							featuredStartIndex: this.featuredStartIndex,
							featuredLastFetched: this.featuredLastFetched,
						})
					);
				} catch (e) {
					// ignore storage errors
				}
			} catch (err) {
				this.featuredError =
					err instanceof Error ? err.message : 'An error occurred';
				this.featuredBooks = [];
			} finally {
				this.featuredLoading = false;
			}
		},

		async fetchBookById(id: string) {
			this.loading = true;
			this.error = '';

			try {
				const url = `https://www.googleapis.com/books/v1/volumes/${id}`;
				const response = await fetch(url);

				if (!response.ok) throw new Error('Failed to fetch book details');

				const data = await response.json();
				this.selectedBook = data;
				return data;
			} catch (err) {
				this.error = err instanceof Error ? err.message : 'An error occurred';
				this.selectedBook = null;
				return null;
			} finally {
				this.loading = false;
			}
		},

		nextPage() {
			this.startIndex += this.maxResults;
			this.fetchBooks();
		},

		previousPage() {
			if (this.startIndex >= this.maxResults) {
				this.startIndex -= this.maxResults;
				this.fetchBooks();
			}
		},

		async fetchBooksBySubject(subject: string) {
			if (!subject.trim()) return;

			try {
				const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(
					subject
				)}&startIndex=0&maxResults=${this.maxResults}&langRestrict=en`;

				const response = await fetch(url);
				if (!response.ok)
					throw new Error(`Failed to fetch books for ${subject}`);

				const data = await response.json();
				const books = data.items || [];
				// Shuffle the books
				this.categorizedBooks[subject] = books.sort(() => Math.random() - 0.5);
			} catch (err) {
				console.error(`Error fetching books for ${subject}:`, err);
				this.categorizedBooks[subject] = [];
			}
		},

		// Clear search state (called on page refresh)
		clearSearch() {
			this.query = '';
			this.books = [];
			this.totalItems = 0;
			this.startIndex = 0;
			this.selectedBook = null;
			this.error = '';
		},
	},
});
