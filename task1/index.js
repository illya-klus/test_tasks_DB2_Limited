import { summarizeText } from "./agent.js";
import fs from 'fs';

const text = fs.readFileSync('article.txt', 'utf-8');


async function run() {
  const summary = await summarizeText(text);
  console.log("Summary:", summary);
}

run();

