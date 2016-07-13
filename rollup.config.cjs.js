import base from './rollup.base.config';

const config = Object.assign({
	format: 'cjs',
	dest: 'dist/get.cjs.js'
}, base);

export default config;
