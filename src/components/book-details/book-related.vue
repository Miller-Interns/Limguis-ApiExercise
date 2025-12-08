<template>
	<div class="related-books">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">
			Other Works by {{ book.volumeInfo.authors?.[0] }}
		</h3>
		<div
			v-if="relatedBooks.length > 0"
			class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
		>
			<router-link
				v-for="relatedBook in relatedBooks.slice(0, 6)"
				:key="relatedBook.id"
				:to="{ name: 'book-details', params: { id: relatedBook.id } }"
				class="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors block"
			>
				<div class="flex gap-3">
					<img
						:src="
							relatedBook.volumeInfo.imageLinks?.thumbnail ||
							'https://aram.nrcp.dost.gov.ph/assets/images/no_cover.jpg'
						"
						:alt="relatedBook.volumeInfo.title"
						class="w-12 h-auto rounded flex-shrink-0"
					/>
					<div class="min-w-0 flex-1">
						<h4 class="text-sm font-medium text-gray-900 truncate">
							{{ relatedBook.volumeInfo.title }}
						</h4>
						<p
							v-if="relatedBook.volumeInfo.publishedDate"
							class="text-xs text-gray-500 mt-1"
						>
							{{ relatedBook.volumeInfo.publishedDate }}
						</p>
					</div>
				</div>
			</router-link>
		</div>
		<div v-else class="text-center py-8">
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
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">
				No Other Works Available
			</h3>
			<p class="mt-1 text-sm text-gray-500">
				No other works by this author were found.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import type { Book } from '@/types';

	const props = defineProps<{
		book: any; // Using any since we need accessInfo
	}>();

	const relatedBooks = ref<Book[]>([]);

	const fetchRelatedBooks = async () => {
		if (!props.book.volumeInfo.authors?.[0]) return;

		try {
			const author = encodeURIComponent(props.book.volumeInfo.authors[0]);
			const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&maxResults=10`;

			const response = await fetch(url);
			if (!response.ok) return;

			const data = await response.json();
			// Filter out the current book and limit to 6
			relatedBooks.value = data.items
				.filter((item: Book) => item.id !== props.book.id)
				.slice(0, 6);
		} catch (error) {
			console.error('Error fetching related books:', error);
		}
	};

	onMounted(() => {
		fetchRelatedBooks();
	});
</script>
