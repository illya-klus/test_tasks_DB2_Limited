import dotenv from 'dotenv';
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function summarizeText(inputText) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful summarizer AI." },
      { role: "user", content: `Summarize this text in 3 or less short sentences:\n\n${inputText}` }
    ]
  });
    return response.choices[0].message.content;
}

export const tasks = {
  summarize: summarizeTask
};