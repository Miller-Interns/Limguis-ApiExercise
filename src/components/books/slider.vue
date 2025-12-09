<template>
	<div class="relative mb-8">
		<!-- prev button -->
		<button
			@click="handlePrev"
			:disabled="!canGoPrev"
			aria-label="Previous"
			class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
			ref="internalRef"
			class="flex gap-4 overflow-x-auto pl-16 pr-16 py-2 scroll-smooth snap-x snap-mandatory no-scrollbar scrollbar-hide"
		>
			<template v-for="book in items.slice(0, displayedItems)" :key="book.id">
				<div
					class="carousel-item flex-none w-[20%] sm:w-1/3 md:w-1/4 lg:w-[27%] snap-start"
				>
					<BookItem :book="book" />
				</div>
			</template>
		</div>

		<!-- next button -->
		<button
			@click="handleNext"
			:disabled="!canGoNext"
			aria-label="Next"
			class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white bg-opacity-80 hover:bg-opacity-100 border border-gray-300 rounded-full p-2 shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
</template>

<script setup lang="ts">
	import BookItem from './book-item.vue';
	import type { Book } from '@/types';
	import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

	const props = defineProps<{
		items: Book[];
		sliderRef?: { value: HTMLElement | null } | null;
		scrollPrev?: (() => void) | null;
		scrollNext?: (() => void) | null;
	}>();

	// If parent passed a ref, use it; otherwise create an internal one
	const internalRef = props.sliderRef ?? ref<HTMLElement | null>(null);

	const itemsPerView = ref(4);

	let resizeListener: (() => void) | null = null;
	let scrollListener: (() => void) | null = null;

	const currentScrollLeft = ref(0);

	onMounted(async () => {
		const updateItemsPerView = () => {
			const width = window.innerWidth;
			itemsPerView.value =
				width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;
		};
		updateItemsPerView();
		window.addEventListener('resize', updateItemsPerView);
		resizeListener = updateItemsPerView;

		await nextTick();
		setCardHeights();

		// Ensure the slider starts at the beginning
		internalRef.value?.scrollTo({ left: 0, behavior: 'instant' });

		const updateScrollPosition = () => {
			if (internalRef.value) {
				currentScrollLeft.value = internalRef.value.scrollLeft;
			}
		};
		internalRef.value?.addEventListener('scroll', updateScrollPosition);
		scrollListener = updateScrollPosition;
		updateScrollPosition(); // Initialize the scroll position
	});

	onUnmounted(() => {
		if (resizeListener) {
			window.removeEventListener('resize', resizeListener);
		}
		if (scrollListener && internalRef.value) {
			internalRef.value.removeEventListener('scroll', scrollListener);
		}
	});

	const displayedItems = computed(() => {
		const len = props.items.length;
		const perView = itemsPerView.value;
		return len <= perView ? len : Math.floor(len / perView) * perView;
	});

	const canGoPrev = computed(() => currentScrollLeft.value > 100);

	const canGoNext = computed(() => {
		if (!internalRef.value) return false;
		const maxScroll =
			internalRef.value.scrollWidth - internalRef.value.clientWidth;
		return currentScrollLeft.value < maxScroll - 100;
	});

	const setCardHeights = () => {
		const el = internalRef.value;
		if (!el) return;
		const items = el.querySelectorAll(
			'.carousel-item'
		) as NodeListOf<HTMLElement>;
		let maxHeight = 0;
		items.forEach((item) => {
			maxHeight = Math.max(maxHeight, item.offsetHeight);
		});
		items.forEach((item) => {
			item.style.height = maxHeight + 'px';
		});
	};

	const scrollByAmount = (el: HTMLElement | null, amount: number) => {
		if (!el) return;
		el.scrollBy({ left: amount, behavior: 'smooth' });
	};

	const computeScrollAmount = (): number => {
		const el = (internalRef as any).value as HTMLElement | null;
		if (!el) return 0;
		const child = el.querySelector('.carousel-item') as HTMLElement | null;
		if (!child) return 0;
		const containerStyle = getComputedStyle(el);
		const gap = parseFloat(containerStyle.gap || '0');
		return itemsPerView.value * (child.clientWidth + gap);
	};

	const handleNext = () => {
		if (props.scrollNext) return props.scrollNext();
		const el = (internalRef as any).value as HTMLElement | null;
		scrollByAmount(el, computeScrollAmount());
	};

	const handlePrev = () => {
		if (props.scrollPrev) return props.scrollPrev();
		const el = (internalRef as any).value as HTMLElement | null;
		scrollByAmount(el, -computeScrollAmount());
	};
</script>

<style scoped>
	@import '@/assets/main.css';
</style>
