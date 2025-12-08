<template>
	<div class="min-h-screen bg-gray-50 py-8">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Header Section -->
			<div class="bg-white rounded-lg shadow-sm p-8 mb-8">
				<div
					class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
				>
					<Button
						@click="$router.push({ name: RouterName.HomePage })"
						severity="secondary"
					>
						<i class="pi pi-arrow-left"></i>
						Back to Home
					</Button>
					<h1 class="text-3xl font-bold text-gray-900">Book Catalogue</h1>
				</div>

				<SearchSection @search="handleSearch" :showLastSearch="true" />
			</div>

			<!-- Loading State -->
			<div
				v-if="store.featuredLoading"
				class="bg-white rounded-lg shadow-sm p-12 text-center mb-8"
			>
				<div class="text-xl text-gray-600">Loading catalogue...</div>
			</div>

			<!-- Error State -->
			<div
				v-else-if="store.featuredError"
				class="bg-white rounded-lg shadow-sm p-12 text-center mb-8"
			>
				<div class="text-xl text-gray-900">{{ store.featuredError }}</div>
			</div>

			<!-- Book Categories -->
			<div v-else class="space-y-8">
				<div
					v-for="subject in visibleSubjects"
					:key="subject"
					class="bg-white rounded-lg shadow-sm p-8"
				>
					<h2 class="text-2xl font-semibold mb-6 text-gray-800">
						{{ subject }}
					</h2>
					<Slider
						v-if="sliders[subject]"
						:items="categorizedStore.categorizedBooks[subject] || []"
						:sliderRef="sliders[subject].sliderRef"
						:scrollPrev="sliders[subject].scrollPrev"
						:scrollNext="sliders[subject].scrollNext"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue';
	import Slider from '@/components/books/slider.vue';
	import { useBooksSearch } from '@/composables/useBooksSearch';
	import { useSlider } from '@/composables/useSlider';
	import { useCategorizedBooks } from '@/composables/useCategorizedBooks';
	import { RouterName } from '@/router/index';
	import SearchSection from '@/components/books/search-section.vue';
	import { useRouter } from 'vue-router';

	const $router = useRouter();

	const { store } = useBooksSearch();
	const { store: categorizedStore, subjects } = useCategorizedBooks();

	const visibleSubjects = computed(() =>
		subjects.filter(
			(s) => (categorizedStore.categorizedBooks[s] || []).length > 0
		)
	);

	// Create a slider instance for each subject
	const sliders = subjects.reduce(
		(acc, subject) => {
			acc[subject] = useSlider();
			return acc;
		},
		{} as Record<string, ReturnType<typeof useSlider>>
	);

	const { performSearch } = useBooksSearch();

	const handleSearch = (query: string) => {
		performSearch(query);
		$router.push({ name: RouterName.SearchBooks, query: { q: query } });
	};
</script>
