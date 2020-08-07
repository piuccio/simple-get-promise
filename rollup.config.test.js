import multiEntry from 'rollup-plugin-multi-entry';

export default {
	input: 'test/**/*.test.js',
	plugins: [multiEntry()],
	output: [{
		file: 'tmp/test-bundle.js',
		format: 'cjs',
		sourcemap: true,
	}],
	external: ['tap', 'http', 'https', 'events', 'url'],
};
