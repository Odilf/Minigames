export function range(size: number, from = 0) {
    return [...Array(size).keys()].map(i => i + from);
}

export function mod(number: number, modulus: number) {
	return ((number % modulus) + modulus) % modulus;
}

export function isBetween(value: number, min: number, max: number) {
	return value <= max && value >= min
}