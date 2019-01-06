module.exports = {
  input: 'src/index.js',
  output: [{
    file: 'dist/get.cjs.js',
    format: 'cjs',
  }, {
    file: 'dist/get.esm.js',
    format: 'esm'
  }],
  external: ['http', 'https', 'url'],
};
