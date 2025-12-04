<template>
	<div class="max-w-4xl mx-auto p-8 bg-white text-black">
		<Button
			label="← Back to Books"
			@click="$router.push({ name: RouterName.Books })"
			class="mb-6 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-all duration-200 border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
		/>

		<div v-if="store.loading" class="text-center p-8 text-xl text-gray-600">
			Loading book details...
		</div>
		<div v-else-if="store.error" class="text-center p-8 text-xl text-black">
			{{ store.error }}
		</div>
		<div v-else-if="book" class="flex flex-col gap-8">
			<BookHeader :book="book" />
			<BookDescription :description="book.volumeInfo.description" />
			<BookISBN :industry-identifiers="book.volumeInfo.industryIdentifiers" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import Button from 'primevue/button';
	import BookHeader from '@/components/book-details/book-header.vue';
	import BookDescription from '@/components/book-details/book-description.vue';
	import BookISBN from '@/components/book-details/book-isbn.vue';
	import { useBookDetails } from '@/composables/useBookDetails';
	import { RouterName } from '@/router';

	const $router = useRouter();
	const { book, store } = useBookDetails();
</script>
