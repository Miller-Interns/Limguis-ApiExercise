<template>
	<div class="flex flex-col sm:flex-row gap-4">
		<InputText
			v-model="localQuery"
			placeholder="Search for books..."
			type="search"
			class="flex-1 px-3 py-2 sm:px-4 sm:py-3"
			@keyup.enter="handleSearch"
		/>
		<Button icon="pi pi-search" label="Search" @click="handleSearch" />
	</div>
	<div v-if="showLastSearch" class="sm:mt-0">
		Last search:
		<a
			href="#"
			@click.prevent="repeatLastSearch"
			class="text-blue-600 hover:text-blue-800 underline"
		>
			{{ store.lastQuery }}
		</a>
	</div>
</template>

<script setup lang="ts">
	import { ref, watch, computed } from 'vue';
	import InputText from 'primevue/inputtext';
	import Button from 'primevue/button';
	import { useBooksStore } from '@/store/books-store';

	const props = defineProps<{
		modelValue?: string;
		showLastSearch?: boolean;
	}>();

	const emit = defineEmits<{
		search: [query: string];
		'update:modelValue': [value: string];
	}>();

	const store = useBooksStore();
	const showLastSearch = computed(
		() => store.lastQuery && props.showLastSearch
	);
	const localQuery = ref(props.modelValue || '');

	watch(
		() => props.modelValue,
		(newValue) => {
			localQuery.value = newValue || '';
		}
	);

	watch(localQuery, (newValue) => {
		emit('update:modelValue', newValue);
	});

	const handleSearch = () => {
		if (localQuery.value.trim()) {
			emit('search', localQuery.value.trim());
		}
	};

	const repeatLastSearch = () => {
		localQuery.value = store.lastQuery;
		handleSearch();
	};
</script>
