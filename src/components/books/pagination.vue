<template>
	<div class="flex justify-center items-center gap-4 mt-8">
		<Button
			label="Previous"
			@click="$emit('previous')"
			:disabled="currentPage === 1"
			class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
		/>
		<span
			class="mx-4 px-3 py-1  font-medium"
			>Page {{ currentPage }}</span
		>
		<Button
			label="Next"
			@click="$emit('next')"
			:disabled="!hasNextPage"
			class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-200"
		/>
	</div>
</template>

<script setup lang="ts">
	import Button from 'primevue/button';

	defineProps<{
		currentPage: number;
		hasNextPage: boolean;
	}>();

	defineEmits<{
		previous: [];
		next: [];
	}>();
</script>
