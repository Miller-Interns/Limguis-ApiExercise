<template>
	<div class="download-section">
		<h3 class="text-lg font-semibold text-gray-800 mb-4">Download Options</h3>

		<!-- Available Downloads Table -->
		<div v-if="hasDownloads" class="overflow-x-auto">
			<table
				class="min-w-full table-auto border-collapse border border-gray-300"
			>
				<thead>
					<tr class="bg-gray-50">
						<th
							class="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
						>
							Format
						</th>
						<th
							class="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
						>
							Availability
						</th>
						<th
							class="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-700"
						>
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-if="book.accessInfo?.epub?.downloadLink"
						class="hover:bg-gray-50"
					>
						<td class="border border-gray-300 px-4 py-2 text-sm text-gray-900">
							EPUB
						</td>
						<td class="border border-gray-300 px-4 py-2 text-sm text-gray-900">
							<span
								v-if="book.accessInfo.epub.isAvailable"
								class="text-green-600"
								>Available</span
							>
							<span v-else class="text-yellow-600">May require purchase</span>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<a
								:href="book.accessInfo.epub.downloadLink"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded border border-gray-300 hover:border-gray-400 transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
							>
								<svg
									class="w-4 h-4 mr-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Download
							</a>
						</td>
					</tr>
					<tr
						v-if="book.accessInfo?.pdf?.downloadLink"
						class="hover:bg-gray-50"
					>
						<td class="border border-gray-300 px-4 py-2 text-sm text-gray-900">
							PDF
						</td>
						<td class="border border-gray-300 px-4 py-2 text-sm text-gray-900">
							<span
								v-if="book.accessInfo.pdf.isAvailable"
								class="text-green-600"
								>Available</span
							>
							<span v-else class="text-yellow-600">May require purchase</span>
						</td>
						<td class="border border-gray-300 px-4 py-2">
							<a
								:href="book.accessInfo.pdf.downloadLink"
								target="_blank"
								rel="noopener noreferrer"
								class="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded border border-gray-300 hover:border-gray-400 transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
							>
								<svg
									class="w-4 h-4 mr-1"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								Download
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- No Downloads Available -->
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
					d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">
				No Downloads Available
			</h3>
			<p class="mt-1 text-sm text-gray-500">
				This book may not be available for free download. Check the Google Books
				page for purchase options or library access.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps<{
		book: any; // Using any for now since accessInfo is not in Book type
	}>();

	const hasDownloads = computed(() => {
		return (
			props.book.accessInfo?.epub?.downloadLink ||
			props.book.accessInfo?.pdf?.downloadLink
		);
	});
</script>
