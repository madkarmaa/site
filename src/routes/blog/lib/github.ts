import { HTTPError } from '@/utils';
import type { Fetch } from '@/types';

type GhDirectoryFile = {
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string;
	type: string;
	_links: {
		self: string;
		git: string;
		html: string;
	};
};

type GhFile = GhDirectoryFile & {
	content: string;
	encoding: string;
};

type RepositoryOptions = {
	branch?: string;
	fetchFn?: Fetch;
};

export default class Repository {
	private owner: string;
	private name: string;
	private branch: string;
	private fetchFn: Fetch;

	public constructor(owner: string, name: string, options: RepositoryOptions = {}) {
		this.owner = owner;
		this.name = name;
		this.branch = options.branch || 'main';
		this.fetchFn = options.fetchFn || fetch;
	}

	private buildApiUrl(path: string) {
		if (path.startsWith('/')) path = path.substring(1);
		return `https://api.github.com/repos/${this.owner}/${this.name}/contents/${path}?ref=${this.branch}`;
	}

	public async listDirectory(path: string) {
		const res = await this.fetchFn(this.buildApiUrl(path));

		if (!res.ok) throw new HTTPError(res);

		return (await res.json()) as GhDirectoryFile[];
	}

	public async getFile(path: string) {
		const res = await this.fetchFn(this.buildApiUrl(path));

		if (!res.ok) throw new HTTPError(res);

		return (await res.json()) as GhFile;
	}

	public async getRawFileContents(path: string) {
		const rawUrl = (await this.getFile(path)).download_url;
		const res = await this.fetchFn(rawUrl);

		if (!res.ok) throw new HTTPError(res);

		return await res.text();
	}

	public useFetchFn(fn: Fetch): this {
		this.fetchFn = fn;
		return this;
	}
}
