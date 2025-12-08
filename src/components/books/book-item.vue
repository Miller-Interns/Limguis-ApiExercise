<template>
	<div
		class="border border-gray-300 rounded-lg overflow-hidden transition-shadow duration-300 bg-white hover:shadow-lg hover:border-black"
	>
		<router-link
			:to="{ name: RouterName.BookDetails, params: { id: book.id } }"
			class="block text-inherit no-underline"
		>
			<div class="flex flex-col h-full">
				<img
					:src="
						book.volumeInfo.imageLinks?.thumbnail ||
						'https://aram.nrcp.dost.gov.ph/assets/images/no_cover.jpg'
					"
					:alt="book.volumeInfo.title"
					class="w-full h-48 object-cover bg-gray-100"
				/>
				<div class="p-4 flex-1">
					<h3 class="m-0 mb-2 text-lg text-black font-medium line-clamp-2">
						{{ book.volumeInfo.title }}
					</h3>
					<p
						v-if="book.volumeInfo.authors"
						class="m-0 text-sm text-gray-600 line-clamp-2"
					>
						by {{ book.volumeInfo.authors.join(', ') }}
					</p>
				</div>
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
	import type { Book } from '@/types';
	import { RouterName } from '@/router';

	defineProps<{
		book: Book;
	}>();
</script>
