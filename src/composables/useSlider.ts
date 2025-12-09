import { ref, onMounted, onUnmounted } from 'vue';

export function useSlider() {
	const sliderRef = ref<HTMLElement | null>(null);

	const itemsPerView = ref(4);

	let resizeListener: (() => void) | null = null;

	onMounted(() => {
		const updateItemsPerView = () => {
			const width = window.innerWidth;
			itemsPerView.value =
				width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;
		};
		updateItemsPerView();
		window.addEventListener('resize', updateItemsPerView);
		resizeListener = updateItemsPerView;
	});

	onUnmounted(() => {
		if (resizeListener) {
			window.removeEventListener('resize', resizeListener);
		}
	});

	const getScrollAmount = () => {
		const el = sliderRef.value;
		if (!el) return 0;
		const child = el.querySelector('.carousel-item') as HTMLElement | null;
		if (!child) return 0;
		const containerStyle = getComputedStyle(el);
		const gap = parseFloat(containerStyle.gap || '0');
		return itemsPerView.value * (child.clientWidth + gap);
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

	return {
		sliderRef,
		scrollNext,
		scrollPrev,
	};
}
