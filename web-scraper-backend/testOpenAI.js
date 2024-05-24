const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: 'sk-proj-andxjVfRVEvbyTCs32H2T3BlbkFJopP2L3sbbBaXnWtTjM3e', // Replace with your actual OpenAI API key
});
const openai = new OpenAIApi(configuration);

async function testOpenAI() {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: 'Hello, how are you?',
      max_tokens: 50,
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error('Error with OpenAI API:', error);
  }
}

testOpenAI();
