import { ref } from 'vue';

export function useSlider() {
	const sliderRef = ref<HTMLElement | null>(null);

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

	return {
		sliderRef,
		scrollNext,
		scrollPrev,
	};
}
