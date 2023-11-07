const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/opsgenie/incidents', async (req, res) => {
  const apiKey = '44b05d98-56ad-4542-b2c4-ca3c48c2673b';
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    const response = await axios.get('https://api.opsgenie.com/v1/incidents', {
      headers: {
        Authorization: `GenieKey ${apiKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Opsgenie' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
