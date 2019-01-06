import multiEntry from 'rollup-plugin-multi-entry';

export default {
	input: 'test/**/*.test.js',
	plugins: [multiEntry()],
	output: [{
		file: 'tmp/test-bundle.js',
		format: 'cjs',
		sourceMap: true,
	}],
};
