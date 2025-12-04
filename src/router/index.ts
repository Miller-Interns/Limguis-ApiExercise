import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/homepage.vue';
import Books from '@/views/books.vue';
import SearchBooks from '@/views/search-books.vue';
import BookDetails from '@/views/book-details.vue';

export const enum RouterName {
	HomePage = 'home-page',
	Books = 'books',
	SearchBooks = 'search-books',
	BookDetails = 'book-details',
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: RouterName.HomePage,
			component: HomePage,
		},
		{
			path: '/books',
			name: RouterName.Books,
			component: Books,
		},
		{
			path: '/books/search',
			name: RouterName.SearchBooks,
			component: SearchBooks,
		},
		{
			path: '/books/:id',
			name: RouterName.BookDetails,
			component: BookDetails,
		},
	],
});

export default router;
