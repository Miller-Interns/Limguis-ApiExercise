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

				<SearchSection
					v-model="searchQuery"
					@search="handleSearch"
					:showLastSearch="false"
				/>
			</div>

			<!-- Initial State -->
			<div
				v-if="showInitialState"
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
				<div
					v-if="store.books.length > 0"
					class="bg-white rounded-lg shadow-sm p-8"
				>
					<BookGrid :books="store.books" />
				</div>

				<!-- No Results -->
				<div v-else class="bg-white rounded-lg shadow-sm p-12 text-center">
					<svg
						class="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.98-5.5-2.5m.5-4C6.19 8.98 4.24 9 2 9s-4.19-.02-4.5-.5m0 0C1.19 8.48 0 7.5 0 6s1.19-2.48 2.5-2.5C3.81 3.02 5.76 3 8 3s4.19.02 4.5.5m0 0C12.81 3.52 14 4.5 14 6s-1.19 2.48-2.5 2.5z"
						/>
					</svg>
					<h3 class="mt-2 text-sm font-medium text-gray-900">
						No Results Found
					</h3>
					<p class="mt-1 text-sm text-gray-500">
						No books match your search query. Try adjusting your search terms.
					</p>
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
	import { onMounted, ref, watch, computed } from 'vue';
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
	const showInitialState = computed(() => !hasSearched.value && !store.loading);
	const searchQuery = ref('');

	const handleSearch = (query: string) => {
		searchQuery.value = query;
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
			if (store.books.length === 0) performSearch(query);
			hasSearched.value = true;
		} else {
			// Use store's lastQuery
			if (store.lastQuery) {
				searchQuery.value = store.lastQuery;
				if (store.books.length === 0) performSearch(store.lastQuery);
				hasSearched.value = true;
			}
		}
	});
</script>
