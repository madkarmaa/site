const levels = {
	debug: {
		message: 'DEBUG',
		styles: ['color: #0f0'].join(';')
	},
	info: {
		message: 'INFO',
		styles: ['color: #0ff'].join(';')
	},
	warn: {
		message: 'WARN',
		styles: ['color: #ff0'].join(';')
	},
	error: {
		message: 'ERROR',
		styles: ['color: #f00'].join(';')
	},
	critical: {
		message: 'CRITICAL',
		styles: ['color: #f00', 'font-weight: 600'].join(';')
	}
} as const;

type LogLevel = keyof typeof levels;

const _log = (level: LogLevel, ...args: any[]) =>
	console.log(`[%c${levels[level].message}%c]`, levels[level].styles, '', ...args);

const logger = Object.keys(levels).reduce(
	(acc, level) => {
		acc[level as LogLevel] = (...args: any[]) => _log(level as LogLevel, ...args);
		return acc;
	},
	{} as Record<LogLevel, (...args: any[]) => void>
);

export default logger;
