import pkg from './package.json';

export default [
	{
		input: 'src/main2.js',
		output: [
			{ file: pkg.demoTwo, format: 'es' }
		]
	}
];