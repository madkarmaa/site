import Repository from './github';

export const REPO_OWNER = 'madkarmaa';
export const REPO = 'madkarmaa.github.io';
export const BRANCH = 'main';

export const repository = new Repository(REPO_OWNER, REPO, { branch: BRANCH });
