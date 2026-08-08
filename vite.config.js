import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { agentag } from './src/vite.js';

export default defineConfig({
	plugins: [agentag()],
	build: {
		lib: {
			entry: Object.fromEntries(
				Object.entries(entries).map(([name, path]) => [name, resolve(path)]),
			),
			formats: ['es'],
			fileName: (_format, name) => `${name}.js`,
		},
		sourcemap: true,
		rolldownOptions: {
			external: (id) => id.startsWith('node:') || !id.startsWith('.') && !id.startsWith('/'),
		},
	},
});
