const { program } = require('commander');
const { existsSync, writeFileSync, readFileSync } = require('fs');

program
    .requiredOption('-i, --input <path>')
    .option('-o, --output <path>')
    .option('-d, --display')
    .option('-s, --survived')
    .option('-a, --age')
    .configureOutput(
        {
            outputError: (str, write) => {
                if (str.includes("required option '-i, --input <path>' not specified") ||
                    str.includes("argument missing")) {
                    return write("Please, specify input file\n");
                }
                return write(str);
            }
        }
    );
program.parse();

const options = program.opts();



if (!existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

if (!options.display && !options.output) {
    process.exit(0);
}

const rawData = readFileSync(options.input, 'utf-8');

const passengers = rawData
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => JSON.parse(line));

let resultLines = [];

passengers.forEach(passenger => {
    if (options.survived) {
        if (passenger.Survived !== "1") return;
    }

    let lineElements = [];

    if (passenger.Name) {
        lineElements.push(passenger.Name);
    }

    if (options.age && passenger.Age) {
        lineElements.push(passenger.Age);
    }

    if (passenger.Ticket) {
        lineElements.push(passenger.Ticket);
    }

    resultLines.push(lineElements.join(' '));
});

const finalOutput = resultLines.join('\n');

if (options.display) {
    console.log(finalOutput);
}

if (options.output) {
    writeFileSync(options.output, finalOutput);
}
