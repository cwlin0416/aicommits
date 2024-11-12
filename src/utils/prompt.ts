import type { CommitType } from './config.js';

const commitTypeFormats: Record<CommitType, string> = {
	'': '<commit message>',
	conventional: '<type>(<optional scope>): <commit message>',
};
const specifyCommitFormat = (type: CommitType) =>
	`The output response must be in format:\n${commitTypeFormats[type]}`;

const commitTypes: Record<CommitType, string> = {
	'': '',

	/**
	 * References:
	 * Commitlint:
	 * https://github.com/conventional-changelog/commitlint/blob/18fbed7ea86ac0ec9d5449b4979b762ec4305a92/%40commitlint/config-conventional/index.js#L40-L100
	 *
	 * Conventional Changelog:
	 * https://github.com/conventional-changelog/conventional-changelog/blob/d0e5d5926c8addba74bc962553dd8bcfba90e228/packages/conventional-changelog-conventionalcommits/writer-opts.js#L182-L193
	 */
	conventional: `Choose a type from the type-to-description JSON below that best describes the git diff:\n${JSON.stringify(
		{
			docs: 'Documentation only changes',
			style:
				'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
			refactor: 'A code change that neither fixes a bug nor adds a feature',
			perf: 'A code change that improves performance',
			test: 'Adding missing tests or correcting existing tests',
			build: 'Changes that affect the build system or external dependencies',
			ci: 'Changes to our CI configuration files and scripts',
			chore: "Other changes that don't modify src or test files",
			revert: 'Reverts a previous commit',
			feat: 'A new feature',
			fix: 'A bug fix',
		},
		null,
		2
	)}`,
};

export const generatePrompt = (
	locale: string,
	maxLength: number,
	type: CommitType,
	draft: string
) =>
	[
		'Take a deep breath and work on this problem step-by-step.',
		'Summarize the provided diff into a clear and concise written commit message.',
		'Write commit message based on my intention and draft below:',
		draft,
		'The commit message of your change plays an important role. It is the first thing other people will see about your change.',
		'Any use of markdown language is not allowed.',
		'',
		'Structure:',
		'A recommended structure is:',
		'',
		'<component>: <subject>',
		'one line blank',
		'<body>',
		'',
		'Explanation:',
		'1. <component>: Specifies the module or area affected by the commit, such as auth, ui, or database.',
		'2. <summary>: A concise description of the commit, ideally under 50 characters, written in the imperative mood, e.g., “Add user login feature.”',
		'3. <body>: Provides detailed information about the commit, including the reasoning or additional context. This section is optional and can be included as needed.',
		'',
		'Subject:',
		'The first line of the commit message is known as the subject. The subject should be less than 80 characters long (aim for 50-70).',
		'* Summarize your change in the subject line. Keep in mind that this will be in the repository forever.',
		'* Optionally, prefix the subject with the relevant component. A component is the general area that your commit will change.',
		'* Use the imperative mood to describe your patch as a change.',
		'* Your subject line should be short, clearly state what your commit is changing.',
		'* Do not end the subject line with a period/full stop/dot (.)',
		'',
		'Body:',
		'When writing the body text, think about the following questions:',
		'* Why should this change be made? What is wrong with the current code?',
		'* Why should it be changed in this way? Are there other ways?',
		'* Did you consider other approaches? If so, describe why they were not as good.',
		'* How can a reviewer test or verify that your code is working correctly?',
		'Recommended:',
		'* Separate the body from the subject with one empty line.',
		'* Wrap the message so that lines are a maximum of 100 characters long.',
		'* Refer to other commits by using a Git commit hash or Gerrit Change-Id.',
		'Not recommended:',
		'* Don\'t refer to other commits with a URL or change number.',
		'* Don\'t use only a URL as the explanation for a change.',
		''
	]
		.filter(Boolean)
		.join('\n');