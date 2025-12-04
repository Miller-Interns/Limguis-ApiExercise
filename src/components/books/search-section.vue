<template>
	<div class="flex flex-col sm:flex-row gap-4 mb-8">
		<InputText
			v-model="localQuery"
			placeholder="Search for books..."
			type="search"
			class="flex-1 px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
			@keyup.enter="handleSearch"
		/>
		<Button
			label="Search"
			@click="handleSearch"
			class="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';

	const emit = defineEmits<{
		search: [query: string];
	}>();

	const localQuery = ref('');

	const handleSearch = () => {
		if (localQuery.value.trim()) {
			emit('search', localQuery.value.trim());
		}
	};
</script>
