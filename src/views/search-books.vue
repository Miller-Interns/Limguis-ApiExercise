<template>
	<div class="books max-w-6xl mx-auto p-4 md:p-8 bg-white text-black">
		<div class="flex flex-col sm:flex-row items-center gap-4 mb-6">
			<Button
				@click="$router.push({ name: RouterName.Books })"
				class="px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
			>
				← Back to Catalogue
			</Button>
			<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
				Search Results
			</h1>
		</div>
		<SearchSection @search="handleSearch" />

		<div
			v-if="!hasSearched && !store.loading"
			class="text-center p-8 text-gray-600"
		>
			Start a search to see results
		</div>

		<div
			v-if="store.loading"
			class="text-center p-4 md:p-8 text-xl text-gray-600"
		>
			Loading...
		</div>

		<div
			v-else-if="store.error"
			class="text-center p-4 md:p-8 text-xl text-black"
		>
			{{ store.error }}
		</div>

		<BookGrid v-else-if="hasSearched" :books="store.books" />

		<Pagination
			v-if="hasSearched && !store.loading && store.books.length > 0"
			:current-page="currentPage"
			:has-next-page="hasNextPage"
			@previous="previousPage"
			@next="nextPage"
		/>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import SearchSection from '@/components/books/search-section.vue';
	import BookGrid from '@/components/books/book-grid.vue';
	import Pagination from '@/components/books/pagination.vue';
	import { useBooksSearch } from '@/composables/useBooksSearch';
	import { RouterName } from '@/router/index';

	const $route = useRoute();
	const $router = useRouter();

	import { ref } from 'vue';

	const {
		performSearch,
		hasNextPage,
		currentPage,
		nextPage,
		previousPage,
		store,
	} = useBooksSearch();

	const hasSearched = ref(false);

	const handleSearch = (query: string) => {
		$router.push({ name: RouterName.SearchBooks, query: { q: query } });
		performSearch(query);
		hasSearched.value = true;
	};

	onMounted(() => {
		const query = $route.query.q as string;
		if (query) {
			if (store.books.length === 0) performSearch(query);
			hasSearched.value = true;
		}
	});
</script>
