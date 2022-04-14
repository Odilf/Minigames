import { cubicOut } from 'svelte/easing';

export function scaleAndRotate(node: Element, params) {
	const {
		delay = 0,
		duration = 400,
		easing = cubicOut,
		start = 0.8
	} = params

	return {
		delay,
		duration,
		easing,
		css: (t: number) => {
			return `opacity: ${t};`
		}
	}
}