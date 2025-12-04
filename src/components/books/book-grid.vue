<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
		<BookItem v-for="book in books" :key="book.id" :book="book" />
	</div>
</template>

<script setup lang="ts">
	import BookItem from './book-item.vue';
	import type { Book } from '@/types';

	defineProps<{
		books: Book[];
	}>();
</script>
