<template>
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header Section -->
			<div class="bg-white rounded-lg shadow-sm p-8 mb-8">
				<div
					class="flex flex-col sm:flex-row items-center justify-between gap-4"
				>
					<Button
						@click="$router.push({ name: RouterName.Books })"
						severity="secondary"
						class="p-button"
					>
						<i class="pi pi-arrow-left"></i>
						Back to Catalogue
					</Button>
				</div>
			</div>

			<!-- Loading State -->
			<div
				v-if="store.loading"
				class="bg-white rounded-lg shadow-sm p-12 text-center"
			>
				<div class="text-xl text-gray-600">Loading book details...</div>
			</div>

			<!-- Error State -->
			<div
				v-else-if="store.error"
				class="bg-white rounded-lg shadow-sm p-12 text-center"
			>
				<div class="text-xl text-gray-900">{{ store.error }}</div>
			</div>

			<!-- Book Details -->
			<div v-else-if="book" class="space-y-8">
				<!-- Book Header Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookHeader :book="book" />
				</div>

				<!-- Description Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookDescription :description="book.volumeInfo.description" />
				</div>

				<!-- Other Editions Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookEditions :book="book" />
				</div>

				<!-- Related Books Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookRelated :book="book" />
				</div>

				<!-- Volume Info Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookVolumeInfo :book="book" />
				</div>

				<!-- Download Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookDownload :book="book" />
				</div>

				<!-- ISBN Card -->
				<div class="bg-white rounded-lg shadow-sm p-8">
					<BookISBN
						:industry-identifiers="book.volumeInfo.industryIdentifiers"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import Button from 'primevue/button';
	import BookHeader from '@/components/book-details/book-header.vue';
	import BookRelated from '@/components/book-details/book-related.vue';
	import BookEditions from '@/components/book-details/book-editions.vue';
	import BookDescription from '@/components/book-details/book-description.vue';
	import BookVolumeInfo from '@/components/book-details/book-volume-info.vue';
	import BookDownload from '@/components/book-details/book-download.vue';
	import BookISBN from '@/components/book-details/book-isbn.vue';
	import { useBookDetails } from '@/composables/useBookDetails';
	import { RouterName } from '@/router';

	const { book, store } = useBookDetails();
</script>
