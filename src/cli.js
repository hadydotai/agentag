#!/usr/bin/env node

import { pathToFileURL } from 'node:url';

export async function cli(args = process.argv.slice(2)) {
	const [cmd, entry, ...rest] = args;
	if (!cmd || cmd === 'help' || cmd === '--help') {
		console.log(help());
		return 0;
	}
}

function help() {
	return `agentag <command> <agent-entry> [options]
Commands:
	dev				run a development server serving the agent through a Hono application
	build			build the agent into a deployable node service
	run				run the agent
	inspect		print the agent's compiled prompt/context plan

Options:
	--input <json>		invocation input for run or inspect
	--id <value>			stable session ID
	--port <number>		development server port
	--outDir <path>		build output directory`;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
	cli().then(
		(code) => { process.exitCode = code; },
		(error) => {
			console.error(`${error.code ?? 'ERROR'}: ${error.message}`);
			process.exitCode = 1;
		}
	);
}


