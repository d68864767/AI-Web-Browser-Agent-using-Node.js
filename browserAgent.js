const puppeteer = require('puppeteer');

class BrowserAgent {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async navigate(url) {
    await this.page.goto(url);
    return { type: 'navigate', status: 'success' };
  }

  async click(selector) {
    await this.page.click(selector);
    return { type: 'click', status: 'success' };
  }

  async fillForm(selector, data) {
    for (let field in data) {
      await this.page.type(`${selector} [name=${field}]`, data[field]);
    }
    return { type: 'fillForm', status: 'success' };
  }

  async scrape(selector) {
    const data = await this.page.evaluate((selector) => {
      return document.querySelector(selector).innerText;
    }, selector);
    return { type: 'scrape', data };
  }

  async performTasks(tasks) {
    const results = [];
    for (let task of tasks) {
      switch (task.type) {
        case 'navigate':
          results.push(await this.navigate(task.url));
          break;
        case 'click':
          results.push(await this.click(task.selector));
          break;
        case 'fillForm':
          results.push(await this.fillForm(task.selector, task.data));
          break;
        case 'scrape':
          results.push(await this.scrape(task.selector));
          break;
        default:
          throw new Error(`Unknown task type: ${task.type}`);
      }
    }
    return results;
  }

  async close() {
    await this.browser.close();
  }
}

module.exports = BrowserAgent;
