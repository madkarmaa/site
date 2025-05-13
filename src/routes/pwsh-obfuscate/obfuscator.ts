import { range } from '@/utils';

type CharEnvMapping = Record<string, Record<string, number[]>>;

const validEnvVars = [
	'ALLUSERSPROFILE',
	'CommonProgramFiles',
	'CommonProgramW6432',
	'ComSpec',
	'PATHEXT',
	'ProgramData',
	'ProgramFiles',
	'ProgramW6432',
	'PUBLIC',
	'SystemDrive',
	'SystemRoot',
	'windir'
] as const;

// mock the Node.js process object
const process = {
	env: {
		ALLUSERSPROFILE: 'C:\\ProgramData',
		CommonProgramFiles: 'C:\\Program Files\\Common Files',
		CommonProgramW6432: 'C:\\Program Files\\Common Files',
		ComSpec: 'C:\\WINDOWS\\system32\\cmd.exe',
		PATHEXT: '.COM;.EXE;.BAT;.CMD;.VBS;.VBE;.JS;.JSE;.WSF;.WSH;.MSC;.CPL',
		ProgramData: 'C:\\ProgramData',
		ProgramFiles: 'C:\\Program Files',
		ProgramW6432: 'C:\\Program Files',
		PUBLIC: 'C:\\Users\\Public',
		SystemDrive: 'C:',
		SystemRoot: 'C:\\WINDOWS',
		windir: 'C:\\WINDOWS'
	}
} as const;

const generateMapping = (): CharEnvMapping => {
	let allPrintableAsciiChars = '';
	for (var i = 32; i <= 126; i++) allPrintableAsciiChars += String.fromCharCode(i);

	const mapping: CharEnvMapping = {};
	for (const char of allPrintableAsciiChars) {
		mapping[char] = {};

		for (const envVar of validEnvVars) {
			const value = process.env[envVar];

			if (value && value.includes(char)) {
				mapping[char][envVar] = [];

				// prettier-ignore
				for (let i = 0; i < value.length; i++)
                    if (char === value[i])
                        mapping[char][envVar].push(i);
			}
		}
	}

	return mapping;
};

const envObfuscate = (code: string): string[] => {
	const obfCode: string[] = [];
	const mapping = generateMapping();

	for (const char of code) {
		const possibleVars = Object.keys(mapping[char]);
		if (!possibleVars || possibleVars.length === 0) {
			obfCode.push('[char]' + char.charCodeAt(0));
			continue;
		}

		const chosenVar = possibleVars.choose();
		const possibleIdxs = mapping[char][chosenVar];
		const chosenIdx = possibleIdxs.choose();

		const pwshSyntax = `$env:${chosenVar}[${chosenIdx}]`;
		obfCode.push(pwshSyntax);
	}

	return obfCode;
};

export const pwshObfuscate = (code: string): string => {
	const iex = envObfuscate('iex');
	const pieces = envObfuscate(code);
	const iexStage = `(${iex.join(',')} -Join \$${range(1, 99999)})`;
	const payloadStage = `(${pieces.join(',')} -Join \$${range(1, 99999)})`;

	return `& ${iexStage} ${payloadStage}`;
};
