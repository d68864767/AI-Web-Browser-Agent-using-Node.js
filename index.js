const express = require('express');
const bodyParser = require('body-parser');
const BrowserAgent = require('./browserAgent');
const { validateTasks } = require('./utils');

const app = express();
app.use(bodyParser.json());

app.post('/perform-tasks', async (req, res) => {
  try {
    const tasks = req.body.tasks;
    validateTasks(tasks);

    const browserAgent = new BrowserAgent();
    await browserAgent.init();

    const results = await browserAgent.performTasks(tasks);

    await browserAgent.close();

    res.json({ results });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
