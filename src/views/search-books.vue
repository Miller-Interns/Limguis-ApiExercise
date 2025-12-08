<template>
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header Section -->
			<div class="bg-white rounded-lg shadow-sm p-8 mb-8">
				<div
					class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
				>
					<Button
						@click="$router.push({ name: RouterName.Books })"
						severity="secondary"
						class="p-button"
					>
						<i class="pi pi-arrow-left"></i>
						Back to Catalogue
					</Button>
					<h1 class="text-3xl font-bold text-gray-900">Search Results</h1>
				</div>

				<SearchSection v-model="searchQuery" @search="handleSearch" :showLastSearch="false" />
			</div>

			<!-- Initial State -->
			<div
				v-if="!hasSearched && !store.loading"
				class="bg-white rounded-lg shadow-sm p-12 text-center mb-8"
			>
				<div class="text-xl text-gray-600">Start a search to see results</div>
			</div>

			<!-- Loading State -->
			<div
				v-if="store.loading"
				class="bg-white rounded-lg shadow-sm p-12 text-center mb-8"
			>
				<div class="text-xl text-gray-600">Loading...</div>
			</div>

			<!-- Error State -->
			<div
				v-else-if="store.error"
				class="bg-white rounded-lg shadow-sm p-12 text-center mb-8"
			>
				<div class="text-xl text-gray-900">{{ store.error }}</div>
			</div>

			<!-- Search Results -->
			<div v-else-if="hasSearched" class="space-y-8">
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookGrid :books="store.books" />
				</div>

				<div
					v-if="store.books.length > 0"
					class="bg-white rounded-lg shadow-sm p-8"
				>
					<Pagination
						:current-page="currentPage"
						:has-next-page="hasNextPage"
						@previous="previousPage"
						@next="nextPage"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref, watch } from 'vue';
	import { useRoute, useRouter } from 'vue-router';
	import SearchSection from '@/components/books/search-section.vue';
	import BookGrid from '@/components/books/book-grid.vue';
	import Pagination from '@/components/books/pagination.vue';
	import { useBooksSearch } from '@/composables/useBooksSearch';
	import { RouterName } from '@/router/index';

	const $route = useRoute();
	const $router = useRouter();

	const {
		performSearch,
		hasNextPage,
		currentPage,
		nextPage,
		previousPage,
		store,
	} = useBooksSearch();

	const hasSearched = ref(false);
	const searchQuery = ref('');

	const handleSearch = (query: string) => {
		searchQuery.value = query;
		localStorage.setItem('lastSearchQuery', query);
		$router.push({ name: RouterName.SearchBooks, query: { q: query } });
		performSearch(query);
		hasSearched.value = true;
	};

	// Watch for route query changes
	watch(
		() => $route.query.q,
		(newQuery) => {
			if (newQuery) {
				searchQuery.value = newQuery as string;
				localStorage.setItem('lastSearchQuery', newQuery as string);
				if (!hasSearched.value || store.books.length === 0) {
					performSearch(newQuery as string);
					hasSearched.value = true;
				}
			}
		}
	);

	onMounted(() => {
		const query = $route.query.q as string;
		if (query) {
			searchQuery.value = query;
			localStorage.setItem('lastSearchQuery', query);
			if (store.books.length === 0) performSearch(query);
			hasSearched.value = true;
		} else {
			// No URL query, check stored query
			const storedQuery = localStorage.getItem('lastSearchQuery');
			if (storedQuery) {
				searchQuery.value = storedQuery;
				if (store.books.length === 0) performSearch(storedQuery);
				hasSearched.value = true;
			}
		}
	});
</script>
