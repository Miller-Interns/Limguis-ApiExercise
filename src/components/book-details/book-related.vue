<template>
	<div v-if="relatedBooks.length > 0" class="related-books">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">
			Other Works by {{ book.volumeInfo.authors?.[0] }}
		</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
