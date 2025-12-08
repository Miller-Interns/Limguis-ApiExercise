<template>
	<div class="book-header flex flex-col sm:flex-row gap-8 items-start">
		<!-- Book Cover -->
		<div class="flex-shrink-0">
			<img
				:src="
					book.volumeInfo.imageLinks?.thumbnail ||
					'https://aram.nrcp.dost.gov.ph/assets/images/no_cover.jpg'
				"
				:alt="book.volumeInfo.title"
				class="book-cover w-48 h-auto rounded-lg shadow-md border border-gray-200"
			/>
		</div>

		<!-- Book Information -->
		<div class="book-info flex-1 min-w-0">
			<h1 class="text-3xl font-bold text-gray-900 mb-3 leading-tight">
				{{ book.volumeInfo.title }}
			</h1>

			<p
				v-if="book.volumeInfo.authors"
				class="text-lg text-gray-600 mb-4 font-medium"
			>
				by {{ book.volumeInfo.authors.join(', ') }}
			</p>

			<div class="space-y-2 text-sm text-gray-500">
				<p v-if="book.volumeInfo.publishedDate" class="flex items-start gap-2">
					<span class="font-medium text-gray-700 w-20">Published:&nbsp</span>
					{{ book.volumeInfo.publishedDate }}
				</p>
				<p v-if="book.volumeInfo.pageCount" class="flex items-start gap-2">
					<span class="font-medium text-gray-700 w-20">Pages:</span>
					{{ book.volumeInfo.pageCount }}
				</p>
				<p v-if="book.volumeInfo.categories" class="flex items-start gap-2">
					<span class="font-medium text-gray-700 w-20">Categories:</span>
					{{ book.volumeInfo.categories.join(', ') }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Book } from '@/types';

	defineProps<{
		book: Book;
	}>();
</script>
