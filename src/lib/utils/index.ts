export const capitalize = (str: string): string => {
	str = str.trim();
	if (str.length === 0) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
};
