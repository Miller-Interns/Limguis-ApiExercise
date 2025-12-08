<template>
	<div v-if="editions.length > 0" class="other-editions">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">Other Editions</h3>
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			<router-link
				v-for="edition in editions.slice(0, 6)"
				:key="edition.id"
				:to="{ name: 'book-details', params: { id: edition.id } }"
				class="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors block"
			>
				<div class="flex gap-3">
					<img
						:src="
							edition.volumeInfo.imageLinks?.thumbnail ||
							'https://aram.nrcp.dost.gov.ph/assets/images/no_cover.jpg'
						"
						:alt="edition.volumeInfo.title"
						class="w-12 h-auto rounded flex-shrink-0"
					/>
					<div class="min-w-0 flex-1">
						<h4 class="text-sm font-medium text-gray-900 truncate">
							{{ edition.volumeInfo.title }}
						</h4>
						<p
							v-if="edition.volumeInfo.publishedDate"
							class="text-xs text-gray-500 mt-1"
						>
							{{ edition.volumeInfo.publishedDate }}
							<span v-if="edition.volumeInfo.publisher">
								• {{ edition.volumeInfo.publisher }}</span
							>
						</p>
						<p
							v-if="edition.volumeInfo.pageCount"
							class="text-xs text-gray-500"
						>
							{{ edition.volumeInfo.pageCount }} pages
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
		book: any; // Using any since additional fields not in types
	}>();

	const editions = ref<any[]>([]);

	const fetchOtherEditions = async () => {
		if (!props.book.volumeInfo.title || !props.book.volumeInfo.authors?.[0])
			return;

		try {
			const title = encodeURIComponent(props.book.volumeInfo.title);
			const author = encodeURIComponent(props.book.volumeInfo.authors[0]);
			const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:"${title}"+inauthor:"${author}"&maxResults=10`;

			const response = await fetch(url);
			if (!response.ok) return;

			const data = await response.json();
			// Filter out the current book and limit to 6
			editions.value = data.items
				.filter((item: any) => item.id !== props.book.id)
				.slice(0, 6);
		} catch (error) {
			console.error('Error fetching other editions:', error);
		}
	};

	onMounted(() => {
		fetchOtherEditions();
	});
</script>
