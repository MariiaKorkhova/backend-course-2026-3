import { Command } from 'commander';
import { existsSync, writeFileSync } from 'node:fs';

const program = new Command();

program
    .option('-i, --input <path>', 'Path to the file for reading (required)')
    .option('-o, --output <path>', 'Path to the file for writing into (not required)')
    .option('-d, --display', 'Show output in the console (not required)')

program.parse();
const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

if (!options.display && !options.output) {
    process.exit(0);
}

const finalOutput = "Test of -o -d -i";

if (options.display) {
    console.log(finalOutput);
}

if (options.output) {
    writeFileSync(options.output, finalOutput);
}
