const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
const port = 5000;

// Set up OpenAI API
const configuration = new Configuration({
  apiKey: 'sk-proj-andxjVfRVEvbyTCs32H2T3BlbkFJopP2L3sbbBaXnWtTjM3e', // Replace with your actual OpenAI API key
});
const openai = new OpenAIApi(configuration);

app.get('/scrape-and-filter', (req, res) => {
  // Run the scraper
  exec('python3 scraper.py', async (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error running scraper');
    }

    // Read the scraped data
    fs.readFile('scraped_data.log', 'utf8', async (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        return res.status(500).send('Error reading scraped data');
      }

      // Use OpenAI to filter the results
      try {
        const response = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt: `Filter the following scraped data: ${data}`,
          max_tokens: 150,
        });

        res.send(response.data.choices[0].text);
      } catch (apiError) {
        console.error(`OpenAI API error: ${apiError}`);
        res.status(500).send('Error processing data with OpenAI API');
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
