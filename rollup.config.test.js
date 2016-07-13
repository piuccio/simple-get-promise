import babel from 'rollup-plugin-babel';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
	entry: 'test/**/*.test.js',
	plugins: [babel(), multiEntry()],
	format: 'cjs',
	dest: 'tmp/test-bundle.js',
	sourceMap: true
};
