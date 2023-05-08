import { Configuration, OpenAIApi } from "openai";

export class OpenAIClient {
  client: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
    this.client = new OpenAIApi(configuration);
  }

  async chatCompletion(text: string) {
    const completion = await this.client.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: text }],
      temperature: 0.7,
      top_p: 1,
      presence_penalty: 0.6,
      frequency_penalty: 0.1,
    });
    return completion.data.choices[0].message?.content;
  }
}
