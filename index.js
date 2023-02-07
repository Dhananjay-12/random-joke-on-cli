
import chalk from "chalk"
import boxen from "boxen"
import yargs from "yargs"
import { hideBin } from 'yargs/helpers'
import axios from 'axios'



const options = yargs(hideBin(process.argv))
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .argv;

const greeting = chalk.white.bold(`Hello ${options.name}`)

const boxenOption = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
    backgroundColor: "#555555"
}

const msgBox = boxen(greeting, boxenOption)
console.log(msgBox)

if (options.search) {
    console.log(`Searching for joke on ${options.search}`)
} else {
    console.log("Fetching a random joke for you...")
}

const url = options.search ? `https://icanhazdadjoke.com/search?term=${options.search}` : "https://icanhazdadjoke.com/";

// axios.get(url, {
//     headers: {
//         Accept: "application/json",
//         'User-Agent': 'hello-cli'
//     }
// })
//     .then(res => {
//         console.log(res.data.joke);
//     });

axios.get(url, {
    headers:
    {
        Accept: "application/json",
        'User-agent': 'hello-cli'
    }
}).then(res => {
    if (options.search) {
        res.data.results.forEach(el => console.log("\n " + el.joke));
    }
    if (res.data.results.length === 0) {
        console.log("no jokes found :'(");
    }
    else {
        console.log(res.data.joke);
    }
});