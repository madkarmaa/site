Array.prototype.choose = function <T extends any[]>(this: T): T[number] {
	return this[Math.floor(Math.random() * this.length)];
};
