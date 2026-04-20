import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';

// @ts-expect-error added by vue scaffold
import pluginCypress from 'eslint-plugin-cypress';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: ['**/*.{ts,mts,tsx,vue}']
	},

	globalIgnores([
		'**/dist/**',
		'**/dist-ssr/**',
		'**/coverage/**',
		'**/ditched_scraps/**'
	]),

	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,

	{
		...pluginVitest.configs.recommended,
		files: ['src/**/__tests__/*']
	},

	{
		...pluginCypress.configs.recommended,
		files: [
			'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
			'cypress/support/**/*.{js,ts,jsx,tsx}'
		]
	},
	skipFormatting,
	{
		rules: {
			indent: ['error', 'tab', { SwitchCase: 1 }],
			quotes: ['error', 'single'],
			semi: ['error', 'always', { omitLastInOneLineBlock: true }],
			eqeqeq: ['error', 'always', { null: 'ignore' }],
			'semi-spacing': 'error',
			'no-extra-semi': 'error',
			'spaced-comment': 'warn',
			'semi-style': ['error', 'last'],
			'linebreak-style': ['error', 'unix'],
			'no-undef': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-unused-expressions': 'off',
			'no-case-declarations': 'off',
			'no-trailing-spaces': ['error'],
			'no-var': 'error',
			'prefer-const': 'error',
			'no-multi-spaces': 'error',
			'keyword-spacing': 'error',
			'no-useless-rename': 'error',
			'no-whitespace-before-property': 'error',
			'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
			'padded-blocks': ['error', 'never'],
			'rest-spread-spacing': 'error',
			'space-before-blocks': 'error',
			'space-in-parens': 'error',
			'space-unary-ops': 'error',
			'no-unneeded-ternary': 'warn',
			'no-template-curly-in-string': 'error',
			'no-self-compare': 'warn',
			'no-return-assign': 'error',
			'comma-style': ['error', 'last'],
			'block-spacing': 'error',
			'comma-dangle': 'error',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-this-alias': 'off',

			'vue/multi-word-component-names': 'off',
			'vue/html-indent': ['error', 'tab'],
			'vue/block-lang': 'off'
		}
	}
);
