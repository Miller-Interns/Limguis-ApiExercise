<template>
	<div class="books max-w-6xl mx-auto p-4 md:p-8 bg-white text-black">
		<div
			class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6"
		>
			<Button
				@click="$router.push({ name: RouterName.HomePage })"
				class="px-4 py-2 sm:px-6 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
			>
				← Back to Home
			</Button>
			<h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
				Book Catalogue
			</h1>
			<Button
				@click="$router.push({ name: RouterName.SearchBooks })"
				class="px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Search Books
			</Button>
		</div>

		<div
			v-if="store.featuredLoading"
			class="text-center p-4 md:p-8 text-xl text-gray-600"
		>
			Loading catalogue...
		</div>
		<div
			v-else-if="store.featuredError"
			class="text-center p-4 md:p-8 text-xl text-black"
		>
			{{ store.featuredError }}
		</div>
		<div v-else>
			<h2 class="text-xl font-semibold mb-4 text-gray-800">Featured Books</h2>
			<!-- Custom horizontal slider (replaces PrimeVue Carousel to avoid stacking issues) -->
			<div class="relative mb-8">
				<!-- prev button -->
				<button
					@click="scrollPrev"
					aria-label="Previous"
					class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<svg
						class="w-5 h-5 text-gray-700"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</button>

				<!-- scroll container -->
				<div
					ref="sliderRef"
					class="flex gap-4 overflow-x-auto px-2 py-2 scroll-smooth snap-x snap-mandatory no-scrollbar scrollbar-hide"
				>
					<template v-for="book in store.featuredBooks" :key="book.id">
						<div
							class="carousel-item flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
						>
							<BookItem :book="book" />
						</div>
					</template>
				</div>

				<!-- next button -->
				<button
					@click="scrollNext"
					aria-label="Next"
					class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					<svg
						class="w-5 h-5 text-gray-700"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted, ref } from 'vue';
	import BookItem from '@/components/books/book-item.vue';
	import { useBooksSearch } from '@/composables/useBooksSearch';
	import { RouterName } from '@/router/index';

	const { performSearch, store } = useBooksSearch();
	const sliderRef = ref<HTMLElement | null>(null);

	const responsiveOptions = [
		{
			breakpoint: '1024px',
			numVisible: 3,
			numScroll: 1,
		},
		{
			breakpoint: '768px',
			numVisible: 2,
			numScroll: 1,
		},
		{
			breakpoint: '560px',
			numVisible: 1,
			numScroll: 1,
		},
	];

	onMounted(() => {
		// restore cached featured catalogue, if present
		try {
			const raw = localStorage.getItem('books-featured');
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed?.featuredBooks?.length) {
					store.featuredBooks = parsed.featuredBooks;
					store.featuredStartIndex = parsed.featuredStartIndex || 0;
					store.featuredLastFetched = parsed.featuredLastFetched || 0;
				}
			}
		} catch (e) {
			/* ignore parse errors */
		}

		const ONE_DAY = 24 * 60 * 60 * 1000;
		const last = store.featuredLastFetched || 0;

		// If there are no featured items or the cached featured list is older than 24 hours, refresh
		if (store.featuredBooks.length === 0 || Date.now() - last > ONE_DAY) {
			store.fetchFeatured('fiction');
		}
	});

	const getScrollAmount = () => {
		const el = sliderRef.value;
		if (!el) return 0;
		const child = el.querySelector('.carousel-item') as HTMLElement | null;
		if (child) {
			const style = getComputedStyle(child);
			const mr = parseFloat(style.marginRight || '0');
			return child.clientWidth + mr;
		}
		return el.clientWidth * 0.8;
	};

	const scrollNext = () => {
		const el = sliderRef.value;
		if (!el) return;
		el.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
	};

	const scrollPrev = () => {
		const el = sliderRef.value;
		if (!el) return;
		el.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
	};
</script>
