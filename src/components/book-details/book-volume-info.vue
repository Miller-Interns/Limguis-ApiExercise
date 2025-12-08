<template>
	<div class="volume-info">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">
			Additional Information
		</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div v-if="book.volumeInfo.publisher" class="flex items-center gap-2">
				<span class="font-medium text-gray-700 w-24">Publisher:</span>
				<span class="text-gray-900">{{ book.volumeInfo.publisher }}</span>
			</div>
			<div v-if="book.volumeInfo.language" class="flex items-center gap-2">
				<span class="font-medium text-gray-700 w-24">Language:</span>
				<span class="text-gray-900">{{
					book.volumeInfo.language.toUpperCase()
				}}</span>
			</div>
			<div v-if="book.volumeInfo.printType" class="flex items-center gap-2">
				<span class="font-medium text-gray-700 w-24">Type:</span>
				<span class="text-gray-900">{{ book.volumeInfo.printType }}</span>
			</div>
			<div
				v-if="book.volumeInfo.maturityRating"
				class="flex items-center gap-2"
			>
				<span class="font-medium text-gray-700 w-24">Rating:</span>
				<span class="text-gray-900">{{ book.volumeInfo.maturityRating }}</span>
			</div>
			<div v-if="book.volumeInfo.averageRating" class="flex items-center gap-2">
				<span class="font-medium text-gray-700 w-24">Rating:</span>
				<div class="flex items-center gap-1">
					<span class="text-gray-900"
						>{{ book.volumeInfo.averageRating }}/5</span
					>
					<span
						v-if="book.volumeInfo.ratingsCount"
						class="text-sm text-gray-500"
					>
						({{ book.volumeInfo.ratingsCount }} reviews)
					</span>
				</div>
			</div>
			<div v-if="book.volumeInfo.dimensions" class="flex items-start gap-2">
				<span class="font-medium text-gray-700 w-24">Dimensions:</span>
				<div class="text-gray-900 text-sm">
					<div v-if="book.volumeInfo.dimensions.height">
						Height: {{ book.volumeInfo.dimensions.height }}
					</div>
					<div v-if="book.volumeInfo.dimensions.width">
						Width: {{ book.volumeInfo.dimensions.width }}
					</div>
					<div v-if="book.volumeInfo.dimensions.thickness">
						Thickness: {{ book.volumeInfo.dimensions.thickness }}
					</div>
				</div>
			</div>
			<div v-if="hasLinks" class="flex items-center gap-2">
				<span class="font-medium text-gray-700 w-24">View on:</span>
				<a
					:href="book.volumeInfo.previewLink || book.volumeInfo.infoLink"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-600 hover:text-blue-800 underline"
				>
					Google Books
				</a>
			</div>
		</div>
		<div v-if="!hasAdditionalInfo" class="text-center py-8">
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
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">
				No Additional Information Available
			</h3>
			<p class="mt-1 text-sm text-gray-500">
				This book does not have additional details provided.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps<{
		book: any; // Using any since additional fields not in types
	}>();

	const hasLinks = computed(
		() => props.book.volumeInfo.previewLink || props.book.volumeInfo.infoLink
	);

	const hasAdditionalInfo = computed(() => {
		const info = props.book.volumeInfo;
		return (
			info.publisher ||
			info.language ||
			info.printType ||
			info.maturityRating ||
			info.averageRating ||
			info.dimensions ||
			hasLinks.value
		);
	});
</script>
