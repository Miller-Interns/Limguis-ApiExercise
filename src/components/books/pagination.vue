<template>
	<div class="flex justify-center items-center gap-4 mt-8">
		<Button
			label="Previous"
			@click="$emit('previous')"
			:disabled="currentPage === 1"
		/>
		<span
			class="mx-4 px-3 py-1  font-medium"
			>Page {{ currentPage }}</span
		>
		<Button
			label="Next"
			@click="$emit('next')"
			:disabled="!hasNextPage"
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
