<template>
	<div v-if="description" class="mt-8 border-t border-gray-300 pt-8">
		<h2 class="mb-4 text-2xl text-black font-medium">Description</h2>
		<div class="leading-relaxed text-gray-800" v-html="description"></div>
	</div>
</template>

<script setup lang="ts">
	defineProps<{
		description?: string;
	}>();
</script>
