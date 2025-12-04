<template>
	<div class="book-header">
		<img
			v-if="book.volumeInfo.imageLinks?.thumbnail"
			:src="book.volumeInfo.imageLinks.thumbnail"
			:alt="book.volumeInfo.title"
			class="book-cover"
		/>
		<div class="book-info">
			<h1>{{ book.volumeInfo.title }}</h1>
			<p v-if="book.volumeInfo.authors" class="authors">
				by {{ book.volumeInfo.authors.join(', ') }}
			</p>
			<p v-if="book.volumeInfo.publishedDate" class="published-date">
				Published: {{ book.volumeInfo.publishedDate }}
			</p>
			<p v-if="book.volumeInfo.pageCount" class="page-count">
				Pages: {{ book.volumeInfo.pageCount }}
			</p>
			<p v-if="book.volumeInfo.categories" class="categories">
				Categories: {{ book.volumeInfo.categories.join(', ') }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Book } from '@/types';

	defineProps<{
		book: Book;
	}>();
</script>
