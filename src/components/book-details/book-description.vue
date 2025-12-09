<template>
	<div class="mt-8 border-t border-gray-300 pt-8">
		<h2 class="mb-4 text-2xl text-black font-medium">Description</h2>
		<div
			v-if="description"
			class="leading-relaxed text-gray-800 text-justify"
			v-html="description"
		></div>
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
					d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">
				No Description Available
			</h3>
			<p class="mt-1 text-sm text-gray-500">
				This book does not have a description provided.
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		description?: string;
	}>();
</script>
