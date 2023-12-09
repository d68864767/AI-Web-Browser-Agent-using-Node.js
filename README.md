# AI Web Browser Agent

This project is an AI Web Browser Agent that can perform basic browsing tasks such as going to a URL, clicking buttons, filling in forms, and scraping data from webpages. It is built using Node.js and Puppeteer, a headless browser library.

## Features

The agent can perform the following tasks:

- Navigate to a specific URL.
- Click on a specific button or link.
- Fill in a form with provided data.
- Scrape data from a webpage.
- Perform a sequence of tasks (e.g. go to a URL, click a button, fill in a form, then scrape data).

These tasks are wrapped into a clean API that can be easily used to perform complex browsing tasks.

## Installation

To install the dependencies, run the following command:

```
npm install
```

## Usage

The program takes a JSON object as input that describes the tasks to perform. Here is an example:

```json
{
  "tasks": [
    {
      "type": "navigate",
      "url": "http://example.com"
    },
    {
      "type": "click",
      "selector": "#my-button"
    },
    {
      "type": "fillForm",
      "selector": "#my-form",
      "data": {
        "field1": "value1",
        "field2": "value2"
      }
    },
    {
      "type": "scrape",
      "selector": "#my-data"
    }
  ]
}
```

To start the program, run the following command:

```
npm start
```

The program outputs a JSON object that contains the result of each task. Here is an example:

```json
{
  "results": [
    {
      "type": "navigate",
      "status": "success"
    },
    {
      "type": "click",
      "status": "success"
    },
    {
      "type": "fillForm",
      "status": "success"
    },
    {
      "type": "scrape",
      "data": "Scraped data"
    }
  ]
}
```

## Testing

To run the tests, use the following command:

```
npm test
```

## License

This project is licensed under the ISC License.
