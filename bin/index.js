#!/usr/bin/env node
import { Command } from 'commander';
import { readFileSync } from 'fs';
import loader from '../src/index.js';

const packageJSON = JSON.parse(readFileSync('./package.json'));
const programm = new Command();

programm
  .description('Page loader utility')
  .version(packageJSON.version)
  .option(
    '-o, --output [dir]',
    'output dir (default: "/home/user/current-dir")',
  )
  .argument('<url>')
  .action(async (url, options) => loader(url, options.output));

programm.parse(process.argv);
