<template>
	<div class="relative mb-8">
		<!-- prev button -->
		<button
			@click="handlePrev"
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
			ref="internalRef"
			class="flex gap-4 overflow-x-auto px-2 py-2 scroll-smooth snap-x snap-mandatory no-scrollbar scrollbar-hide"
		>
			<template v-for="book in items" :key="book.id">
				<div
					class="carousel-item flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 snap-start"
				>
					<BookItem :book="book" />
				</div>
			</template>
		</div>

		<!-- next button -->
		<button
			@click="handleNext"
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
</template>

<script setup lang="ts">
	import BookItem from './book-item.vue';
	import type { Book } from '@/types';
	import { ref } from 'vue';

	const props = defineProps<{
		items: Book[];
		sliderRef?: { value: HTMLElement | null } | null;
		scrollPrev?: (() => void) | null;
		scrollNext?: (() => void) | null;
	}>();

	// If parent passed a ref, use it; otherwise create an internal one
	const internalRef = props.sliderRef ?? ref<HTMLElement | null>(null);

	const scrollByAmount = (el: HTMLElement | null, amount: number) => {
		if (!el) return;
		el.scrollBy({ left: amount, behavior: 'smooth' });
	};

	const computeScrollAmount = (): number => {
		const el = (internalRef as any).value as HTMLElement | null;
		if (!el) return 0;
		const child = el.querySelector('.carousel-item') as HTMLElement | null;
		if (child) {
			const style = getComputedStyle(child);
			const mr = parseFloat(style.marginRight || '0');
			return child.clientWidth + mr;
		}
		return el.clientWidth * 0.8;
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
